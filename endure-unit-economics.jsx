import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .app {
    min-height: 100vh;
    background: #0D1117;
    color: #E8E3D8;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.6;
  }

  .header {
    border-bottom: 1px solid rgba(212,168,83,0.18);
    padding: 18px 40px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .logo-mark {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 20px;
    font-weight: 600;
    color: #D4A853;
    letter-spacing: -1px;
  }
  .header-sub {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 300;
    color: rgba(232,227,216,0.4);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .main {
    max-width: 740px;
    margin: 0 auto;
    padding: 56px 40px 80px;
  }

  /* ── INTRO ── */
  .eyebrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #D4A853;
    margin-bottom: 18px;
  }
  .intro-heading {
    font-family: 'Playfair Display', serif;
    font-size: 46px;
    line-height: 1.1;
    font-weight: 400;
    color: #E8E3D8;
    margin-bottom: 22px;
  }
  .intro-body {
    font-size: 15px;
    color: rgba(232,227,216,0.55);
    max-width: 520px;
    line-height: 1.75;
    margin-bottom: 48px;
  }

  /* ── FORM ── */
  .card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(232,227,216,0.08);
    border-radius: 8px;
    padding: 32px;
    margin-bottom: 32px;
  }
  .form-group { margin-bottom: 24px; }
  .form-group:last-child { margin-bottom: 0; }
  .form-label {
    display: block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(212,168,83,0.75);
    margin-bottom: 8px;
  }
  .form-hint {
    font-size: 12px;
    color: rgba(232,227,216,0.35);
    margin-bottom: 8px;
    font-style: italic;
  }
  .form-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(232,227,216,0.1);
    border-radius: 4px;
    color: #E8E3D8;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.2s;
    resize: vertical;
  }
  .form-input:focus { border-color: rgba(212,168,83,0.45); }
  .form-input::placeholder { color: rgba(232,227,216,0.2); }

  /* ── BUTTONS ── */
  .btn {
    background: #D4A853;
    color: #0D1117;
    border: none;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    padding: 13px 28px;
    cursor: pointer;
    text-transform: uppercase;
    transition: opacity 0.15s, transform 0.1s;
  }
  .btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
  .btn-ghost {
    background: transparent;
    color: rgba(232,227,216,0.5);
    border: 1px solid rgba(232,227,216,0.12);
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.04); opacity: 1; color: #E8E3D8; }

  /* ── INTERVIEW ── */
  .progress-track {
    display: flex;
    gap: 5px;
    margin-bottom: 52px;
  }
  .progress-seg {
    height: 3px;
    flex: 1;
    border-radius: 2px;
    background: rgba(232,227,216,0.08);
    transition: background 0.3s;
  }
  .progress-seg.active { background: #D4A853; }
  .progress-seg.done { background: rgba(212,168,83,0.35); }

  .focus-badge {
    display: inline-block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #D4A853;
    border: 1px solid rgba(212,168,83,0.25);
    border-radius: 20px;
    padding: 4px 12px;
    margin-bottom: 18px;
  }
  .q-text {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    line-height: 1.3;
    font-weight: 400;
    color: #E8E3D8;
    margin-bottom: 10px;
  }
  .q-hint {
    font-size: 13px;
    color: rgba(232,227,216,0.38);
    font-style: italic;
    margin-bottom: 28px;
  }
  .q-counter {
    font-size: 12px;
    color: rgba(232,227,216,0.28);
    align-self: center;
  }

  /* ── LOADING ── */
  .loading-wrap {
    padding: 100px 0;
    text-align: center;
  }
  .spinner {
    width: 38px; height: 38px;
    border: 2px solid rgba(212,168,83,0.12);
    border-top-color: #D4A853;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    margin: 0 auto 24px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(212,168,83,0.55);
  }

  /* ── RESULTS ── */
  .results-title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 400;
    color: #E8E3D8;
    margin-bottom: 4px;
  }
  .results-sub {
    font-size: 13px;
    color: rgba(232,227,216,0.35);
    margin-bottom: 40px;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.05em;
  }

  .ratio-card {
    background: rgba(212,168,83,0.05);
    border: 1px solid rgba(212,168,83,0.18);
    border-radius: 8px;
    padding: 40px;
    text-align: center;
    margin-bottom: 24px;
  }
  .ratio-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(212,168,83,0.65);
    margin-bottom: 14px;
  }
  .ratio-value {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 72px;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 14px;
  }
  .ratio-interp {
    font-size: 14px;
    color: rgba(232,227,216,0.55);
    max-width: 400px;
    margin: 0 auto 6px;
  }
  .ratio-bench {
    font-size: 12px;
    color: rgba(232,227,216,0.28);
    font-style: italic;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 40px;
  }
  .metric-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(232,227,216,0.07);
    border-radius: 8px;
    padding: 26px;
  }
  .metric-type {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .type-cac { color: #E07558; }
  .type-ltv { color: #5CB88A; }
  .metric-range {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 26px;
    font-weight: 500;
    color: #E8E3D8;
    margin-bottom: 16px;
    line-height: 1.1;
  }
  .assumptions { list-style: none; display: flex; flex-direction: column; gap: 6px; }
  .assumption {
    font-size: 12px;
    color: rgba(232,227,216,0.38);
    display: flex;
    gap: 8px;
  }
  .assumption::before { content: '—'; color: rgba(232,227,216,0.18); flex-shrink: 0; }

  .section-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(212,168,83,0.6);
    margin-bottom: 16px;
  }

  .endure-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 40px; }
  .endure-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(232,227,216,0.06);
    border-left: 3px solid rgba(212,168,83,0.5);
    border-radius: 0 6px 6px 0;
    padding: 18px 22px;
    display: grid;
    grid-template-columns: 36px 1fr auto;
    gap: 18px;
    align-items: start;
  }
  .e-letter {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 700;
    color: #D4A853;
    opacity: 0.55;
    line-height: 1;
    padding-top: 2px;
  }
  .e-dim {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(212,168,83,0.55);
    margin-bottom: 6px;
  }
  .e-insight {
    font-size: 13px;
    color: rgba(232,227,216,0.68);
    line-height: 1.55;
  }
  .impact-pill {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 3px;
    background: rgba(212,168,83,0.08);
    color: rgba(212,168,83,0.6);
    white-space: nowrap;
  }

  .brief-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(232,227,216,0.07);
    border-radius: 8px;
    padding: 30px;
    margin-bottom: 36px;
  }
  .brief-text {
    font-size: 14px;
    color: rgba(232,227,216,0.62);
    line-height: 1.85;
    white-space: pre-wrap;
  }

  .actions { display: flex; gap: 12px; }

  /* ── PRINT ── */
  @media print {
    .app { background: #fff; color: #111; }
    .header { border-color: #ddd; background: #fff; }
    .logo-mark { color: #222; }
    .eyebrow, .section-label, .ratio-label, .metric-type, .e-dim { color: #555; }
    .no-print { display: none !important; }
    .ratio-card { background: #f8f6f0; border-color: #ddd; }
    .metric-card, .endure-card, .brief-card { background: #f8f6f0; border-color: #ddd; }
    .ratio-value, .metric-range { color: #111; }
    .ratio-interp, .e-insight, .brief-text, .assumption { color: #333; }
    .endure-card { border-left-color: #666; }
    .intro-heading, .results-title { color: #111; }
  }
`;

const SYSTEM_QUESTIONS = `You help design thinking students analyze unit economics for early-stage startup ideas.
Generate exactly 5 interview questions to estimate CAC (Customer Acquisition Cost) and LTV (Lifetime Value) for the student's specific project.
Be concrete and specific to their idea — reference the actual product, customer, channel.
Questions should be answerable without real data yet (educated estimates are fine).
Alternate between CAC and LTV focus. Keep each question to one sentence.
Return ONLY valid JSON with no markdown, no explanation:
{"questions":[{"id":1,"text":"question","focus":"CAC","hint":"short guidance for student"}]}`;

const SYSTEM_ANALYSIS = `You analyze startup unit economics through the ENDURE framework for a design thinking class.
ENDURE dimensions: Environmental Scanning (E), Network Orchestration (N), Disruptive Experimentation (D), Unmet Needs Research (U), Resilience Building (R), Evolution Enablement (E).
Based on the project and interview, estimate realistic CAC and LTV ranges for an early-stage startup.
Pick 2–3 ENDURE dimensions most relevant to economics risks or opportunities — be specific to their project.
Return ONLY valid JSON with no markdown, no explanation:
{
  "cac":{"low":number,"high":number,"assumptions":["...","...","..."]},
  "ltv":{"low":number,"high":number,"assumptions":["...","...","..."]},
  "ratio":{"value":number,"interpretation":"one sentence on viability","benchmark":"industry context"},
  "endure":[{"dimension":"full name","letter":"single letter","insight":"2-3 sentences connecting this dimension to their CAC or LTV","impact":"CAC|LTV|Both"}],
  "brief":"2-3 paragraph written brief covering the numbers, assumptions, and strategic risks for class discussion."
}`;

const fmt = (n) => n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
const ratioColor = (r) => r >= 3 ? "#5CB88A" : r >= 2 ? "#D4A853" : "#E07558";

export default function App() {
  const [step, setStep] = useState("intro");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAns, setCurrentAns] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const callClaude = async (userMsg, sys) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: sys,
        messages: [{ role: "user", content: userMsg }],
      }),
    });
    const data = await res.json();
    return data.content[0].text;
  };

  const startInterview = async () => {
    setError("");
    setStep("loading");
    try {
      const raw = await callClaude(`Project: ${name}\n\nDescription: ${desc}`, SYSTEM_QUESTIONS);
      const parsed = JSON.parse(raw.trim());
      setQuestions(parsed.questions);
      setStep("interview");
    } catch {
      setError("Something went wrong. Please try again.");
      setStep("intro");
    }
  };

  const submitAnswer = async () => {
    const newAnswers = [...answers, { q: questions[qIndex].text, a: currentAns, focus: questions[qIndex].focus }];
    setAnswers(newAnswers);
    setCurrentAns("");
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
    } else {
      setStep("loading");
      try {
        const qa = newAnswers.map((x, i) => `Q${i + 1} [${x.focus}]: ${x.q}\nA: ${x.a}`).join("\n\n");
        const raw = await callClaude(
          `Project: ${name}\nDescription: ${desc}\n\nInterview:\n${qa}`,
          SYSTEM_ANALYSIS
        );
        const parsed = JSON.parse(raw.trim());
        setResults(parsed);
        setStep("results");
      } catch {
        setError("Something went wrong generating results. Please try again.");
        setStep("interview");
      }
    }
  };

  const reset = () => {
    setStep("intro"); setName(""); setDesc(""); setQuestions([]);
    setQIndex(0); setAnswers([]); setCurrentAns(""); setResults(null); setError("");
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <header className="header">
          <span className="logo-mark">ENDURE</span>
          <span className="header-sub">Unit Economics Workshop</span>
        </header>

        <main className="main">

          {/* ── INTRO ── */}
          {step === "intro" && (
            <div>
              <div className="eyebrow">Design Thinking · Unit Economics</div>
              <h1 className="intro-heading">
                What does one customer<br /><em>actually</em> cost — and earn?
              </h1>
              <p className="intro-body">
                This tool guides you through estimating CAC (Customer Acquisition Cost) 
                and LTV (Lifetime Value) for your startup idea. Your model will be reviewed 
                through the ENDURE framework — showing how strategic choices shape your economics.
              </p>

              <div className="card">
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input
                    className="form-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. GreenDelivery, TutorLink..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Describe your startup idea</label>
                  <div className="form-hint">Who is your customer? What do you sell? How do they find you?</div>
                  <textarea
                    className="form-input"
                    rows={5}
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    placeholder="We help [who] do [what] by [how]. Our customers find us through [channel] and pay [roughly how much] for [what]..."
                  />
                </div>
              </div>

              {error && <div style={{ color: "#E07558", fontSize: 13, marginBottom: 16 }}>{error}</div>}
              <button className="btn" onClick={startInterview} disabled={!name.trim() || !desc.trim()}>
                Begin Analysis →
              </button>
            </div>
          )}

          {/* ── INTERVIEW ── */}
          {step === "interview" && questions[qIndex] && (
            <div>
              <div className="progress-track no-print">
                {questions.map((_, i) => (
                  <div key={i} className={`progress-seg ${i < qIndex ? "done" : i === qIndex ? "active" : ""}`} />
                ))}
              </div>

              <div className="focus-badge">{questions[qIndex].focus} Driver</div>
              <div className="q-text">{questions[qIndex].text}</div>
              <div className="q-hint">{questions[qIndex].hint}</div>

              <textarea
                className="form-input"
                rows={4}
                value={currentAns}
                onChange={e => setCurrentAns(e.target.value)}
                placeholder="Your answer — estimates and ranges are fine..."
                style={{ marginBottom: 22 }}
              />

              <div className="actions">
                <button className="btn" onClick={submitAnswer} disabled={!currentAns.trim()}>
                  {qIndex + 1 < questions.length ? "Next →" : "Generate Model →"}
                </button>
                <span className="q-counter">{qIndex + 1} of {questions.length}</span>
              </div>
            </div>
          )}

          {/* ── LOADING ── */}
          {step === "loading" && (
            <div className="loading-wrap">
              <div className="spinner" />
              <div className="loading-text">Building your model…</div>
            </div>
          )}

          {/* ── RESULTS ── */}
          {step === "results" && results && (
            <div>
              <div className="eyebrow">{name}</div>
              <div className="results-title">Unit Economics Analysis</div>
              <div className="results-sub">Generated for class discussion · {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>

              {/* Ratio */}
              <div className="ratio-card">
                <div className="ratio-label">LTV : CAC Ratio</div>
                <div className="ratio-value" style={{ color: ratioColor(results.ratio.value) }}>
                  {Number(results.ratio.value).toFixed(1)}×
                </div>
                <div className="ratio-interp">{results.ratio.interpretation}</div>
                <div className="ratio-bench">{results.ratio.benchmark}</div>
              </div>

              {/* CAC + LTV */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-type type-cac">Customer Acquisition Cost</div>
                  <div className="metric-range">{fmt(results.cac.low)} – {fmt(results.cac.high)}</div>
                  <ul className="assumptions">
                    {results.cac.assumptions.map((a, i) => <li key={i} className="assumption">{a}</li>)}
                  </ul>
                </div>
                <div className="metric-card">
                  <div className="metric-type type-ltv">Lifetime Value</div>
                  <div className="metric-range">{fmt(results.ltv.low)} – {fmt(results.ltv.high)}</div>
                  <ul className="assumptions">
                    {results.ltv.assumptions.map((a, i) => <li key={i} className="assumption">{a}</li>)}
                  </ul>
                </div>
              </div>

              {/* ENDURE */}
              <div className="section-label">ENDURE Framework Commentary</div>
              <div className="endure-list">
                {results.endure.map((e, i) => (
                  <div key={i} className="endure-card">
                    <div className="e-letter">{e.letter}</div>
                    <div>
                      <div className="e-dim">{e.dimension}</div>
                      <div className="e-insight">{e.insight}</div>
                    </div>
                    <div className="impact-pill">{e.impact}</div>
                  </div>
                ))}
              </div>

              {/* Brief */}
              <div className="section-label">Strategic Brief</div>
              <div className="brief-card">
                <div className="brief-text">{results.brief}</div>
              </div>

              {/* Actions */}
              <div className="actions no-print">
                <button className="btn" onClick={() => window.print()}>Print / Save PDF</button>
                <button className="btn btn-ghost" onClick={reset}>New Analysis</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
