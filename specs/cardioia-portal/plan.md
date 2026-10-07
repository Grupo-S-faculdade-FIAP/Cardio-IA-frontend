# Implementation Plan: CardioIA Portal

## Architecture

- Vite + React SPA with React Router.
- `AuthContext` owns the demo identity and JWT-shaped localStorage token.
- `ProtectedRoute` gates the `/app` route tree; `AppShell` supplies navigation.
- `patientApi.js` returns local JSON fixtures asynchronously.
- `AppointmentsContext` owns reducer-based appointments and browser persistence.
- `ThemeContext` owns the light/dark preference, persists it locally, and applies the theme to the document root.
- Page components compose dashboard, patient search, and appointment scheduling views.
- Shared responsive styles use semantic surface and text tokens for both palettes; `AppShell.module.css` demonstrates scoped component styling.

## Data flow

1. Sign-in writes a fake token and updates AuthContext.
2. Protected routes render the shell only when a parsed demo user exists.
3. Patient pages load local fixtures; `useDeferredValue` defers list filtering.
4. Appointment form dispatches validated events to the appointment reducer.
5. The provider writes reducer state to localStorage; dashboard metrics derive from that state.
6. ThemeContext restores the visual preference before page rendering and updates the document theme when toggled.

## Verification

- `npm run lint`
- `npm run build`
- Browser check: direct protected URL, login, navigation, appointment creation, refresh, logout.
- Browser check at desktop and mobile viewport widths.
- Browser check that theme switching applies to login and portal, persists after reload, and keeps controls readable.