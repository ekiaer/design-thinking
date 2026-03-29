# Design Thinking Course — Student Tools
## Project Spec for Kai (Claude Code)
_Instructor: Erik Kiaer · Bates Center for Entrepreneurship & Leadership, Lewis & Clark College_

---

## Context

Erik teaches a 14-week design thinking course using personal hydration as a shared venture theme. Students work in teams to develop, test, and refine venture concepts. The underlying framework is **ENDURE** — six innovation habits — but this is held in the background; students experience it through the questions, not the labels.

**Five weeks remain.** The goal is three lightweight AI-powered web tools that guide students through building a cumulative venture document, submitted via Google Classroom.

---

## Hosting & Tech

- **Keep everything on the existing Google site.** Do not migrate to Netlify this semester.
- **Frontend only** — no backend, no database, no auth.
- Each tool is a standalone HTML/JS page that calls the Anthropic API directly from the client.
- Students copy-paste the generated output into their Google Classroom assignment submission.
- Build in VS Code, deploy to Google Sites as embedded pages or linked standalone URLs.

**Stack:**
- Vanilla HTML + CSS + JS (or React if preferred — Erik is fine either way)
- Anthropic API (`claude-sonnet-4-20250514`) called client-side
- No frameworks beyond what's needed
- Print-friendly output on every tool

---

## The Three Tools

### Tool 1 — VIABILITY: Unit Economics Model ✅ DONE
Already built as a React artifact. Generates CAC/LTV model + ENDURE commentary + strategic brief.
**Action:** Port this into the site as the first tool page.

---

### Tool 2 — FEASIBILITY: Experiment & Prototype Log
**Deploy by: Week 10–11 (next two weeks)**

**Purpose:** Help students document their experiment cycles and prototype thinking in a structured way that reflects genuine learning, not just outcomes.

**Flow:**
1. Student enters: project name, prototype/experiment description, what they were testing
2. AI asks 4 guided questions (one at a time):
   - What did you predict would happen, and how confident were you? (1–10)
   - What actually happened?
   - What did you learn that surprised you?
   - What would you do differently, and what's your next experiment?
3. AI generates a formatted **Experiment Log Entry** containing:
   - A structured before/after forecast (inspired by Tetlock's superforecasting framing)
   - Key learning synthesis in plain language
   - 2–3 questions the student still can't answer
   - A "Prototype maturity" indicator: _Concept / Early test / Validated direction_
   - One paragraph connecting their findings to business feasibility

**Output format:** Clean printable block with section headers. Students copy into Google Classroom.

**Design note:** Tone should feel like a thoughtful coach, not a grading rubric. Celebrate honest failure. Avoid corporate innovation language.

---

### Tool 3 — DESIRABILITY: Customer & Unmet Needs Synthesis
**Deploy by: Week 12 (three weeks out)**

**Purpose:** Help students move from scattered field observations to a coherent, specific customer insight they can build on. This is the "thick description to scalable concept" synthesis.

**Flow:**
1. Student enters: project name, target customer description, 2–3 field observations or interview moments (raw notes are fine)
2. AI asks 4 guided questions (one at a time):
   - Who is your most extreme or specific user — describe one real person
   - What do they currently do (the workaround, the habit, the coping behavior)?
   - What does that behavior tell you about what they actually value?
   - If you could change one thing about their experience, what would it be and why?
3. AI generates a **Desirability Brief** containing:
   - A synthesized customer insight (specific, not generic)
   - An "unmet need" framing: _"[Customer] needs a way to [job-to-be-done] because [insight]"_
   - 2–3 design implications for the venture
   - Honest gaps: what they still don't know about this customer
   - One paragraph on how the insight could scale beyond the extreme user

**Output format:** Same printable block style as Tool 2.

---

## Final Document Assembly (Week 13–14)

No new tool needed. Students have three generated sections from the three tools above. The Google Classroom final assignment asks them to:

1. Paste all three sections into one document
2. Write a 1-paragraph reflection connecting the three: _"What we learned about our customer (Desirability) shaped our experiments (Feasibility), which refined our economic model (Viability) by..."_
3. Submit

This final assembly is done by the student, not by a tool — intentionally. The synthesis reflection is where the learning crystallizes.

---

## Design Principles (for Kai)

- **Tone:** Warm, direct, intellectually honest. Not a chatbot. Not a rubric generator.
- **ENDURE stays in the background.** Questions are informed by ENDURE habits but students don't see the labels unless they ask. Exception: the Viability tool already uses ENDURE commentary — keep it.
- **Celebrate uncertainty.** Tools should reward students who say "I don't know yet" — make space for honest not-knowing.
- **No busy UI.** Students use these as homework before class. Keep it fast, focused, one question at a time.
- **Print first.** Every tool needs a clean print view — this is what gets submitted and discussed in class.

---

## Timeline

| Week | Class Theme | Tool Needed |
|------|-------------|-------------|
| 10 (Tue Mar 31) | Psychological Safety & Intelligent Failure I | Viability tool live |
| 11 | Psychological Safety & Intelligent Failure II | Feasibility tool live |
| 12 | Thick Insight to Scalable Concepts | Desirability tool live |
| 13 | Integration | All three tools done; students assembling final doc |
| 14 | Final Presentations | No new tools |

---

## For Tuesday's Class (2 days out)

The **Viability / Unit Economics tool** is already built and ready. Students can use it as homework tonight or tomorrow. It:
- Interviews them about their hydration venture
- Estimates CAC and LTV ranges with key assumptions
- Provides ENDURE-linked strategic commentary
- Generates a printable brief they can bring to class

Erik has the React file (`endure-unit-economics.jsx`). Embed or link it however works fastest for Tuesday — even a Claude artifact link works as a stopgap.

---

## What Kai Does NOT Need to Build

- Google Classroom integration / API (too much auth complexity for 5 weeks)
- Student login or accounts
- Data persistence between sessions (students copy-paste output — that's the "save")
- Netlify migration (stay on Google this semester)
- A mobile app

---

## Questions for Kai Before Starting

1. Does Erik have a Google Site URL to embed into, or is this being served as a standalone static page?
2. Is there a shared API key set up, or does each student use their own? (Recommend: Erik holds one key, tools are classroom-only)
3. Any college IT restrictions on external API calls from student browsers?
