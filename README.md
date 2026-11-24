# GramSetu AI — frontend project

A complete React + Vite college-project frontend based on the supplied GramSetu workflow. Designed in a calm emerald, sage and warm-neutral palette with a responsive citizen workspace and staff dashboard. No paid services or API keys are required for the local demo.

## Prerequisites
- Node.js 22.12 or newer compatible supported release, and npm.
- A modern browser with IndexedDB enabled.
- Internet for the first npm installation, map tiles and optional Google Fonts. Fonts fall back to system fonts if unavailable.
- VS Code and Git are useful but optional.

## Run
Unzip the project, open a terminal in the folder containing package.json, then:
```sh
npm install
npm run dev
```
Open the Local URL printed by Vite (normally http://localhost:5173).
For a production-style local demo:
```sh
npm run build
npm run preview
```
Open the URL printed by preview (normally http://localhost:4173). The service worker is registered only in this production preview/build. Hosting uses the root path `/`; subpath deployment needs URL/base adjustments.

## Test staff account
Click **Staff login** in the sidebar.
- User ID: `GraminsetuAdmin`
- Password: `Epics@24`
Case sensitive. The user ID intentionally retains the spelling requested by the project owner.

SECURITY WARNING: This is a client-side demonstration check, not authentication or authorization. Anyone inspecting or altering the source can bypass it. There is no secret in a frontend bundle. Do not deploy this login with real records. No auth token is saved; reload signs the administrator out. Credentials are supplied for this college demo only.

## Screens and working behavior
1. Overview: hero, calculated cards, real Leaflet map, category distribution, latest records, process steps.
2. Report issue: English/Hindi/Hinglish text, report-language choice, photo and audio file attachment (5 MB each), preview/removal, current GPS, manual map pin, locality fallback, impact sliders and review step.
3. Review: keyword category suggestion, manual category correction, transparent priority score and safety override, nearby candidate warning, explicit demo privacy acknowledgement.
4. Tracking: device-owned reports, sample community records, ID/text/locality search, category/status filters, detail modal and status timeline.
5. Community map: OpenStreetMap tiles, colored point markers, safe text tooltips, filtering, record details. No heatmap or marker clustering is claimed.
6. Offline queue: IndexedDB persistence of records and attachments, locally generated submission ID, reconnect handling, retry and duplicate-safe local reconciliation.
7. Staff dashboard: totals, review queue, safety review, filters, complaint details, department changes, required notes, status history, CSV export with formula-prefix escaping.
8. Duplicate review: conservative demonstrative candidate rule (same category, within 300 metres, within 7 days, open records), human confirmation and incident-group linking without deleting reports.
9. Help: demo steps, privacy boundaries and a confirmation-gated local reset.

Navigation supports English and Hindi. Some reporting labels are translated; the admin and help screens are English. Report text accepts Hindi Unicode and Hinglish. This is partial UI localization, not a claim of complete translation.

## Data and AI boundaries
- Twelve startup records use synthetic locations and simulated statuses. All counts are calculated from local data; none are real civic performance metrics.
- Citizen-created records persist across reloads in this browser. This is not a real citizen account or cross-device storage. All records are inspectable from the local browser, including attachments.
- Category suggestions use keyword rules in `src/logic.js`; no trained model or statistical confidence estimate is included. Hindi and Hinglish coverage is limited to those rules.
- Priority uses the report's illustrative 0.35/0.25/0.20/0.10/0.10 formula. Inputs are normalized 0–100, self-reported; recurrence defaults to zero. Safety detection is a limited keyword rule, not reliable emergency detection. Safety flags force the Critical label independent of numeric score.
- Audio is an attachment, NOT automatic speech transcription. There is no microphone recording UI, ASR or image inference.
- The offline queue syncs to the LOCAL demonstration store, never a remote server. IDs are generated locally and retained. Real server acknowledgement and server-issued IDs remain integration work.
- No SMS, notifications, government routing, emergency response, DBSCAN or remote backend is connected.

## Offline test
1. Run production build/preview, load online, then reload once so the installed service worker controls the page.
2. Open DevTools > Application > Service Workers to verify control. Keep IndexedDB storage enabled.
3. Set Network > Offline (this is more reliable than disconnecting a phone with an active alternate connection).
4. Submit a report with an optional small photo. A local tracking ID is created and the report appears as Pending in Offline queue.
5. Reload while offline; the app shell and pending record should remain available after the shell has been cached.
6. Switch back online; the record moves to the local complaint store once, preserving its client ID.
7. Repeat reconnection/reload and verify only one copy exists.
Limitations: first-ever offline visit is not supported; map tiles are not cached by this service worker; browser storage can be evicted; quota errors are shown; attachment validation at this layer is MIME/size only. Invalid/corrupt media must also be decoded and inspected on a real backend. IndexedDB failure blocks startup rather than silently discarding reports.

## Tests
```sh
npm test
```
Includes rule categories, safety override, bounded priority inputs, missing-coordinate handling, duplicate candidate rules, and idempotent queue logic.
See `docs/TESTING.md` for manual UI acceptance checks. Tests do not replace browser integration testing.

## Project structure
- `src/App.jsx`: responsive screens and reusable UI components
- `src/styles.css`: complete design system and responsive styles
- `src/logic.js`: deterministic demo rules and helpers
- `src/storage.js`: IndexedDB adapter
- `src/data.js`: labeled synthetic sample records
- `public/sw.js`: same-origin app-shell caching; intentionally excludes third-party maps
- `public/manifest.webmanifest`, `public/icon.svg`: install metadata
- `tests/logic.test.js`: Node unit tests
- `docs/BACKEND_INTEGRATION.md`: FastAPI integration contract and production requirements
- `docs/TESTING.md`: manual demo checklist

## Deployment
Build with `npm run build`; upload `dist` to a static host using build command `npm run build`, output directory `dist`. Use HTTPS for GPS and service worker support outside localhost. Host at `/`. OpenStreetMap attribution is retained in the map. Do not remove it, bulk-download tiles or precache the public OSM tile server. Review provider usage terms before a public deployment. Check your browser's PWA install support; a manifest alone does not guarantee installability on every platform.

## Accessibility and privacy
Semantic inputs and labels, visible focus rings, reduced-motion support, skip navigation, keyboard-trapped dialogs, escape-to-close, large responsive controls and text status labels are provided. This has not been audited for WCAG conformance. Test keyboard/screen-reader behavior and color contrast before claiming compliance. Never put real citizen PII into this local demo. Clearing site data removes all records; use CSV export for non-sensitive tabular demo data, not attachment backup.

## Dependencies and reproducibility
Dependency ranges are declared in package.json; run npm install to generate package-lock.json and commit that lockfile to your own repository. No lockfile or installed node_modules is included. Before presentation, install, build and test on the actual demo computer. Check third-party dependency licenses before redistribution.

## Public references
- Vite setup: https://vite.dev/guide/
- Leaflet: https://leafletjs.com/examples/quick-start/
- OSM tile policy: https://operations.osmfoundation.org/policies/tiles/
