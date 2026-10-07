# Feature Spec: CardioIA Portal

## Status

Implemented baseline and persistent dark mode · 2026-10-06

## Goal

Provide a small responsive React portal to demonstrate patient data, appointment scheduling, and simple clinic metrics without a backend.

## Users

Students demonstrating a front-end assignment and a fictional cardiology-clinic operator using demo data.

## Scope

- Simulated sign-in through Context API with a JWT-shaped token in localStorage.
- Guarded app routes for overview, patient list, and appointments.
- Local JSON patient fixtures served through a Promise-based fake API.
- Appointment form using `useState` and `useReducer`, with localStorage persistence.
- Dashboard metrics and a weekly appointment visualization.
- Persistent light/dark theme preference available on login and authenticated pages.
- Responsive styling, CSS Modules, accessibility basics, and DesignMD public tokens.

## Out of scope

- Real authentication, backend/API integration, database, medical advice, or real patient data.
- Editing patient records, role management, appointment notifications, or clinical analytics.

## Acceptance criteria

1. An unauthenticated visitor is redirected to `/login` before seeing demo records.
2. A valid demo email opens the portal; the simulated session survives refresh and logout clears it.
3. The overview displays patient count, total appointments, today's appointments, and a weekly chart.
4. Patient search filters the local fixture list without a network dependency.
5. A user can schedule an appointment for a fixture patient, and the list/dashboard update and persist locally.
6. The form rejects incomplete fields and a conflicting date/time slot.
7. The main flows are usable on narrow screens and the interface identifies itself as a demo.
8. A theme control switches the complete interface between light and dark palettes, and the choice survives refresh and route changes.

## Risks and constraints

- The token is unsigned and only simulates a session. It provides no security.
- Data in localStorage is browser-local, resettable, and unsuitable for health information.
- Patient and appointment examples are invented and intended only for interface demonstration.
- Google Fonts require network access; CSS font fallbacks remain available.
- Theme preference is a visual setting stored locally and does not affect authentication or data.