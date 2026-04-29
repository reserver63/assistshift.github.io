# DevLaunch Teams Landing Page

This repository now contains a static landing page version of DevLaunch Teams inspired by the provided React/Tailwind design draft.

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
# DevLaunch Teams MVP

Improved static MVP for a junior-developer accelerator platform.

## What is included

- Cohort/team creation with track selection (Unity/Android) and team-size validation.
- Task management with a kanban flow: To Do → In Progress → Done.
- Task status filter and delete actions.
- Certificate issuance with track filter and delete actions.
- Automatic sorting of teams, tasks, and certificates for cleaner page organization.
- KPI metrics cards (teams, tasks, completed tasks, certificates).
- Demo data loader and one-click reset.
- User-friendly UX improvements: labels, helper text, empty states, and reset confirmation.
- User-facing status messages for successful and invalid actions.

## Run locally

```bash
cd /workspace/assistshift.github.io
python3 -m http.server 8080
```

Open `http://localhost:8080`.
A lightweight MVP for a junior-developer accelerator platform. It allows you to:

- Create cohorts and 5-person teams.
- Create and move tasks across a mini kanban flow.
- Issue simple company-backed certificate records.

## Run locally

Because this project is static HTML/CSS/JS, you can run it with any simple server.

Example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Persistence

Data is persisted in browser `localStorage` with key `devlaunch-mvp-v2`.
## Notes

- Data is persisted in browser `localStorage`.
- This is MVP functionality intended as a foundation for a fuller multi-role product.
