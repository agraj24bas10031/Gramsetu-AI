# Demo acceptance checklist

Run these on the actual laptop and phone used for presentation. This package has not been browser-tested in the generation environment.

## Automated
- npm install succeeds with a compatible Node version.
- npm test passes.
- npm run build succeeds without missing imports.
- npm run preview serves the build without console errors.

## Citizen flow
- English, Hindi and Hinglish text remains intact after saving/reload.
- Empty/short description and empty locality are blocked.
- File types outside allowed MIME list and files over 5 MB are rejected.
- Photo preview/removal works; audio attachment playback/removal works.
- No claim of ASR output or trained classification confidence appears.
- GPS success shows coordinates/accuracy; permission denial gives a manual fallback.
- Clicking the map sets a map_pin location; clearing it returns to locality-only input.
- Review shows editable category, department, illustrative score and limited-rule safety warning.
- Privacy checkbox is required before submission.
- New ID appears in My complaints with submitted history.
- Filters, search and no-result empty states work.
- Reload preserves device-owned records and attachments.

## Staff flow
- Wrong credentials show an error; requested test credentials work.
- Reload signs out; staff nav disappears on sign-out.
- Detail dialog traps keyboard focus and closes with Escape.
- Status and department changes require a note and survive reload.
- Citizen view reflects staff updates in the same browser store.
- Export CSV opens correctly, includes active filters and escapes formula prefixes.
- Candidate review links records into a shared incident group, leaving both complaints intact.

## Offline
- Production build online-first then reload establishes service-worker control.
- DevTools Offline allows app reload after cache warm-up.
- Offline report with attachment appears in IndexedDB pending queue.
- Pending queue survives an offline reload.
- Reconnection transfers a record into local complaints only once.
- Basemap not available offline is clearly disclosed.
- Storage-full/write-failure behavior does not falsely report a successful save.

## Responsive/accessibility
- 360, 390, 768, 1024 and 1440 px widths: no page-level horizontal overflow.
- Table intentionally scrolls horizontally on narrow displays.
- Sidebar drawer opens/closes, overlay dismisses it, nav is operable by keyboard.
- Form labels, visible focus, skip link and dialog screen-reader names work.
- Test real Hindi font rendering and text wrapping on Android.
- Test with 200% browser zoom, reduced-motion preference and a screen reader.
- OpenStreetMap attribution stays visible.

## Honest presentation
Explain that synthetic sample records, keyword suggestions, local demo sync and client-side login are not production AI, real civic outcomes, authentication or live municipal integration.
