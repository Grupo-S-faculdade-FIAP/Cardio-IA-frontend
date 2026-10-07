# Implementation Tasks

## FIAP submission checklist

- [x] Confirm repository is public and default branch is `main`.
- [x] Document installation and execution commands in README.
- [x] Add the supplied member names and RMs to README.
- [ ] Confirm the final group slug and rename the repository if required; current name is `Cardio-IA-frontend`.
- [ ] Align or confirm the required `contexts` and `services` folder names; current source folders are `context` and `data`.
- [ ] Record a complete demo video of at most four minutes, publish it as unlisted on YouTube, and add its link to README.

- [x] Add persistent theme Context and accessible toggle controls.
- [x] Define dark semantic tokens and adapt shared surfaces, inputs, and status states.
- [x] Verify light/dark coverage, persistence, and contrast in browser.
- [x] Run lint and production build after theme changes.

- [x] Scaffold React + Vite project.
- [x] Add DesignMD-derived tokens and project design notes.
- [x] Implement simulated auth Context and protected routing.
- [x] Add local patient fixtures and asynchronous fake API.
- [x] Implement dashboard metrics and weekly visualization.
- [x] Implement deferred patient search.
- [x] Implement reducer-driven appointment form and local persistence.
- [x] Add responsive UI and demo-data disclaimers.
- [x] Run lint and production build.
- [x] Verify protected navigation, scheduling, persistence, and responsive views in browser.

## Verification record

- `npm run lint`: passed without warnings.
- `npm run build`: passed.
- Browser: demo login, session refresh, logout redirect, local patient search, appointment creation, duplicate-slot rejection, and local persistence passed.
- Browser at 390 px: dashboard rendered without horizontal overflow.
- Browser: light/dark switching updates login and dashboard, persists after refresh, and remains active after logout; dark surfaces and login brand contrast verified.
- `npm run lint` and `npm run build`: passed after dark-mode implementation.