# CardioIA Design System

This project uses the publicly visible DesignMD HubSpot token preview as a reference: https://www.designmd.co/d/hubspot. The complete written design document is part of DesignMD Pro, so this file records only the public tokens and the project-specific decisions made from them.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| Brand | `#124548` | Primary actions, navigation and clinical identity |
| Accent | `#ff4800` | Focus and restrained emphasis |
| Background | `#f7f8f6` | App canvas |
| Surface | `#fcfcfa` | Sidebar and quiet surfaces |
| Text | `#1f2825` | Primary text |
| Border | `#e5eae7` | Dividers and control outlines |

## Project decisions

- Light interface with a dense, scannable clinical workspace.
- DM Sans for interface text and DM Serif Display for editorial headings; both fall back to system-safe fonts.
- Use orange sparingly alongside teal, green, coral and neutral surfaces.
- Keep layouts responsive, keyboard-focusable and respectful of reduced-motion preferences.
- Every patient and appointment shown by the prototype is fictional. Do not enter real health information.

## Source note

The public DesignMD page lists HubSpot's primary color as `#124548`, background as `#ffffff`, surface as `#fcfcfa`, and accent as `#ff4800`. HubSpot's proprietary fonts are not bundled; this interface uses available Google Fonts equivalents.