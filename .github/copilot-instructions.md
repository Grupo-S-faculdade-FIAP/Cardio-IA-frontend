# CardioIA project rules

- Keep the application front-end only. Do not add a real API, credentials, patient data, or clinical decision logic.
- Treat all records and the JWT-shaped localStorage value as fake demo data, never as secure authentication.
- Keep patient fixtures in `src/data/patients.json`; access them through `src/data/patientApi.js`.
- Keep appointment state transitions in the reducer under `src/state/` and authentication state in `src/context/`.
- Protect every route that renders clinical demo data with `ProtectedRoute`.
- Use React hooks for local state and effects; use `useReducer` for multi-field appointment form state and appointment transitions.
- Use CSS Modules for component-scoped rules and shared CSS variables for global design tokens. Follow `DESIGN.md` for visual changes.
- Before implementation, update the relevant feature spec and tasks under `specs/`. Before handoff, run `npm run lint` and `npm run build` and record any unavailable checks.
- Never describe this prototype as suitable for real patient care or real health data.