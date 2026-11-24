# Real backend integration plan

Current runtime is exclusively browser-local; .env.example is future configuration, not a working network adapter.

## Required real services
- FastAPI API with authenticated staff routes and citizen complaint authorization.
- PostgreSQL + PostGIS for authoritative complaint data and spatial search.
- Private object storage for attachments, with safe signed access and retention controls.
- Optional inference endpoints for classification, duplicates, image processing and ASR.

## Recommended integration sequence
1. Keep all screens operational with the existing local demo adapter while implementing a real API adapter.
2. POST complaints with client_submission_id as an idempotency key. Enforce a unique database constraint; return the same complaint for repeated retries, including lost-response retries.
3. Return a server ID, accepted timestamp and canonical workflow state. Update IndexedDB queue state only after the server acknowledgement.
4. Upload attachments through a validated endpoint and persist references rather than base64 inside complaint JSON. Handle incomplete uploads and resume/retry explicitly.
5. Replace the client login with a real staff auth endpoint and secure server-validated session (for example HttpOnly Secure cookie with suitable SameSite/CSRF controls). Validate roles on every staff action.
6. Implement complaint access checks, audit history, transition validation and status update concurrency controls on the server.
7. Replace demo rules with measured inference outputs and review flags. Preserve original text, model version, prediction and any user correction separately.
8. Keep generated geographic examples labeled; use actual permissioned geographic data for real monitoring.

## Proposed endpoints (not implemented)
POST /auth/login
GET /auth/me
POST /auth/logout
POST /complaints
GET /complaints?category=&status=&locality=&search=&cursor=
GET /complaints/{id}
POST /complaints/{id}/attachments
PATCH /complaints/{id}/status
PATCH /complaints/{id}/assignment
POST /complaints/{id}/incident-link
GET /map/complaints?bbox=&category=&status=
GET /dashboard/summary
POST /ai/classify
POST /ai/duplicates
POST /ai/priority
POST /ai/transcribe

## Example create payload
```json
{
  "client_submission_id": "stable-device-generated-uuid",
  "original_text": "School ke saamne gaddha hai",
  "language": "hinglish",
  "confirmed_category": "road_damage",
  "locality": "Example village",
  "location": {"latitude": 28.453, "longitude": 77.051, "source": "map_pin", "accuracy_m": null},
  "attachment_ids": [],
  "consent_version": "prototype-v1"
}
```
Example response: status 201 for a new record or 200 for a previously accepted client submission; return complaint_id, client_submission_id, created_at, status and processing_state. Consider persisting first with processing_state=pending so a failed model does not lose the complaint.

## Important production controls
- Do not treat a hidden admin screen or client role boolean as authorization.
- Real staff credentials belong in a server-side credential store, hashed with a suitable password-hashing algorithm. Never put secrets in VITE_ variables.
- Authorize citizen detail access; complaint IDs alone are not access control.
- Server-side validation: coordinates/ranges, text lengths, content signatures, decoded media, upload size limits, malware inspection as appropriate, and rate limits.
- Strip sensitive metadata, avoid leaking precise locations on public maps, define data retention/deletion and consent policy with your college/deployment partner.
- Return safe structured validation/auth/network errors; keep retryable failures distinct from permanently rejected records.
- Use PostgreSQL transactions for complaint creation, history and idempotency; do not trust client priority/department/status.
- Map candidate distance in metres using correct spatial types; evaluate false-merge risk independently from hotspot clustering.
- Ensure offline retries cannot overwrite newer staff changes. Use version/ETag checks on updates.
- Provide real retry states (pending, uploading, failed, accepted), attachment state and server reconciliation in the UI.
- Add monitoring, backups, accessibility/user testing and a jurisdiction-appropriate privacy review before any live deployment.
