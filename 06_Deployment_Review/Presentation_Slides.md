# Presentation: Password & Passphrase Generator

Duration: 5-10 minutes (timings per slide provided)

---

## Slide 1 — Title (20s)
- Project: Password & Passphrase Generator
- Team / Author: Eterhart / Nisha
- Demo focus: live demo + SDLC summary

Speaker notes:
- Greet the audience, state name and project, and what you'll show (quick demo then SDLC summary).
- Keep this very short — 20 seconds.

---

## Slide 2 — One-line elevator pitch (30s)
- A small web app to generate secure passwords and passphrases, preview history, and show security score and tips.

Speaker notes:
- Summarize problem and solution in one sentence.
- Mention quick tech stack: React + Vite + Tailwind + Supabase (if used) / Deployed on Vercel.

---

## Slide 3 — Quick architecture & tech (30s)
- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS
- Optional backend: Supabase (for history/persistence)
- Build: `npm run build` → output `dist`
- Deployment target: Vercel (recommended)

Speaker notes:
- Keep short; this slide orients the audience before demo.
- Mention repository structure briefly (show later if asked).

---

## Slide 4 — Demo plan & script (15s)
- What I'll show (live):
  1. Start app (or open deployed site)
  2. Generate a password and copy it
  3. Show passphrase generator options
  4. Show password history & security score

Speaker notes:
- Tell the audience you'll do a quick live demo now; mention you'll switch to the app window.

---

## Slide 5 — Live demo (2–4 minutes)
- Actions to perform (demo script):
  1. Run locally (or open deployed URL):

    ```powershell
    cd 'C:\Users\Nisha\Downloads\CS436_FinalProject\04_Implementation'
    npm install
    npm run dev
    # open the browser at shown localhost URL
    ```

  2. Or show deployed URL (e.g., Vercel preview / production link)
  3. Interact: choose options, generate password, copy, switch to passphrase mode, generate, show history and score

Speaker notes:
- Narrate why each feature is useful (e.g., strong password options, entropy/score, convenience of history).
- If you run into build time limits, use the deployed link to avoid waiting for local build.

---

## Slide 6 — SDLC summary (60s)
- Requirements: `01_Requirements/Scope_Document.md`, `User_Stories.md`
- Design & UI: `02_UX_UI_Design/Prototype` and `Design_Rationale.md`
- System design: `03_System_Design/Technology_Stack_Justification.md`
- Implementation: `04_Implementation` (React + Vite code)
- Testing: `05_Testing/Test_Case_Report.md` and `Test_Evidence`
- Deployment & review: `06_Deployment_Review/User_Manual.md` + deployment notes (Vercel)

Speaker notes:
- Walk through the SDLC phases briefly and map them to repo folders and artifacts.
- Emphasize iteration: how feedback updated designs and tests.

---

## Slide 7 — Key challenges & lessons (30s)
- Challenge: balancing security (entropy) and usability
- Challenge: handling environment variables for safe deployment (Supabase keys)
- Lesson: automate deploys via Git + Vercel for quick previews

Speaker notes:
- Mention how you mitigated issues (use `VITE_` env vars, local preview, CI/CD via Vercel Git integration).

---

## Slide 8 — Demo wrap-up & verification (30s)
- How to verify the app works:
  - `npm run build` locally then `npm run preview` to test production build
  - Or view deployment logs on Vercel dashboard
- Next steps: add E2E tests, add unit tests for generators, enhanced security audits

Speaker notes:
- Quickly show `package.json` scripts and mention the `build`/`preview` workflow.

---

## Slide 9 — Call to action / Next steps (15s)
- Ask for questions
- Invite feedback on UX or additional features (e.g., password policies, export/import history)

Speaker notes:
- Thank the audience and open to short Q&A.

---

## Appendix — Speaker checklist (for you)
- Ensure laptop is connected to the internet and browser tabs ready.
- If demoing locally: run `npm i` before presentation and pre-run `npm run dev` so the app opens fast.
- If using Vercel: have the production URL and dashboard login ready (or a screenshot of the deployment logs if network is flaky).
- Have a fallback: a short recorded GIF of the demo (if live demo fails).

---

## Appendix — Convert to PPTX (optional)
- If you want a PowerPoint file, you can convert this markdown with `pandoc`:

```powershell
# install pandoc first (https://pandoc.org/installing.html)
# convert to pptx
pandoc Presentation_Slides.md -o Presentation_Slides.pptx
```

- Or copy/paste slide headings into PowerPoint/Google Slides and paste the speaker notes into the notes section.

---

End of deck. Good luck!
