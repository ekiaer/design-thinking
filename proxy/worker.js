/**
 * Cloudflare Worker — Anthropic API Proxy
 *
 * Holds the API key server-side so it's never exposed in client code.
 *
 * Setup:
 *   1. npx wrangler init endure-proxy
 *   2. Copy this file as src/index.js (or reference in wrangler.toml)
 *   3. wrangler secret put ANTHROPIC_API_KEY   (paste your key when prompted)
 *   4. Update ALLOWED_ORIGINS below with your GitHub Pages domain
 *   5. npx wrangler deploy
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

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return corsResponse(origin, new Response(null, { status: 204 }));
    }

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
      if (body.max_tokens > 4000) {
        body.max_tokens = 4000;
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
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Access-Control-Max-Age", "86400");
  return new Response(response.body, {
    status: response.status,
    headers,
  });
}
