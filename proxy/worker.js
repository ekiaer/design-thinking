/**
 * Cloudflare Worker — Anthropic API Proxy + Signup Slots
 *
 * Holds the API key server-side so it's never exposed in client code.
 * Also manages presentation signup slots via KV storage.
 */

const ALLOWED_ORIGINS = [
  "https://ekiaer.github.io",
  "https://www.chock.llc",
  "http://localhost:8000",           // Local dev
  "http://127.0.0.1:8000",
  "null",                            // file:// origin for local testing
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return corsResponse(origin, new Response(null, { status: 204 }));
    }

    // ── Signup endpoints ──
    if (url.pathname === "/signups") {
      if (!ALLOWED_ORIGINS.includes(origin)) {
        return corsResponse(origin, new Response("Forbidden", { status: 403 }));
      }

      if (request.method === "GET") {
        const data = await env.SIGNUPS.get("slots", "json") || {};
        return corsResponse(origin, new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" }
        }));
      }

      if (request.method === "POST") {
        const body = await request.json();
        const { slotKey, teamName, action } = body;
        if (!slotKey) {
          return corsResponse(origin, new Response(
            JSON.stringify({ error: "Missing slotKey" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          ));
        }
        const data = await env.SIGNUPS.get("slots", "json") || {};
        if (action === "cancel") {
          delete data[slotKey];
        } else {
          if (!teamName || !teamName.trim()) {
            return corsResponse(origin, new Response(
              JSON.stringify({ error: "Missing teamName" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            ));
          }
          // Prevent double-booking
          if (data[slotKey]) {
            return corsResponse(origin, new Response(
              JSON.stringify({ error: "Slot already taken" }),
              { status: 409, headers: { "Content-Type": "application/json" } }
            ));
          }
          data[slotKey] = teamName.trim();
        }
        await env.SIGNUPS.put("slots", JSON.stringify(data));
        return corsResponse(origin, new Response(JSON.stringify(data), {
          headers: { "Content-Type": "application/json" }
        }));
      }

      return corsResponse(origin, new Response("Method not allowed", { status: 405 }));
    }

    // ── Anthropic API proxy ──
    if (request.method !== "POST") {
      return corsResponse(origin, new Response("Method not allowed", { status: 405 }));
    }

    // Validate origin
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return corsResponse(origin, new Response("Forbidden", { status: 403 }));
    }

    try {
      const body = await request.json();

      // Only allow messages endpoint, only allow specific models
      const allowedModels = ["claude-sonnet-4-6", "claude-sonnet-4-20250514", "claude-haiku-4-5-20251001"];
      if (!allowedModels.includes(body.model)) {
        return corsResponse(origin, new Response(
          JSON.stringify({ error: "Model not allowed" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        ));
      }

      // Cap max_tokens to prevent abuse
      if (body.max_tokens > 16000) {
        body.max_tokens = 16000;
      }

      const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(body),
      });

      const apiBody = await apiRes.text();
      return corsResponse(origin, new Response(apiBody, {
        status: apiRes.status,
        headers: { "Content-Type": "application/json" },
      }));
    } catch (err) {
      return corsResponse(origin, new Response(
        JSON.stringify({ error: "Proxy error: " + err.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      ));
    }
  },
};

function corsResponse(origin, response) {
  const headers = new Headers(response.headers);
  if (ALLOWED_ORIGINS.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
