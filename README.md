# DevLaunch Teams Landing Page

This repository now contains a static landing page version of DevLaunch Teams inspired by the provided React/Tailwind design draft.
It also includes a lightweight `app.js` admin panel for basic cohort/task/certificate operations.

## Included sections

- Hero section with positioning, value proposition, and CTA buttons
- Example team panel with track/project/member/task/certificate visual
- Problem and solution sections
- 5-step process section
- Level-based responsibility section (Level C/B/A)
- Track focus and outcomes section
- Final CTA banner
- Sticky top navigation for fast section access
- Clear "Nasıl Katılırım?" action section for developers, companies, and partners
- Admin panel section with forms and live counters backed by `localStorage`

## Run locally

```bash
cd /workspace/assistshift.github.io
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## If you still see the old MVP screen

Do a hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) after starting the server.
