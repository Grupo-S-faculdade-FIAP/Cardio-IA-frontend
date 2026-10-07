# CardioIA project constitution

## Product boundary

CardioIA is an academic front-end prototype. It has no backend, no real identity provider, and no clinical function. Fixtures are fictional and must not be replaced with real personal or health information.

## Implementation rules

- Work from a written feature spec, plan, and task list in `specs/`.
- Keep data access behind small local modules and state transitions explicit.
- Protect all clinical-data routes behind the simulated AuthContext.
- Prefer accessible native controls, responsive layouts, and the tokens in `DESIGN.md`.
- Keep dependencies and abstractions proportional to the feature.

## Definition of done

- Acceptance criteria in the feature spec are implemented.
- `npm run lint` and `npm run build` pass.
- Responsive behavior and the protected-route flow are checked in the browser.
- Known prototype/security limitations are visible in the interface and documentation.