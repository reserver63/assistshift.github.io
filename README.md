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

Then open `http://localhost:8080`.

## Persistence

Data is persisted in browser `localStorage` with key `devlaunch-mvp-v2`.
