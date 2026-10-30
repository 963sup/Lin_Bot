# P2: LINE Webhook implementation plan (not implemented)

## Acceptance criteria

1. Add LINE SDK and an HTTP Webhook endpoint.
2. Verify `x-line-signature` with the original request body **before** interpreting events.
3. Support webhook batches, event mapping, text messages and initial reply use case.
4. Isolate LINE SDK from Domain and Application via inbound/outbound adapters.
5. Prevent duplicate effects using `webhookEventId` and a reliable idempotency design when persistence is required.
6. Account for redelivery/out-of-order events and reply-token single-use/short lifetime.
7. Create synthetic contract/integration fixtures without real user content.
8. Update architecture ADRs, privacy/security controls and operations documentation.

## Open decisions

- Concrete business goals and supported message types.
- Persistence and queue needs.
- Hosting environment, URL, HTTPS, credentials and observability.

Do not add LINE secrets, production webhook URLs or live replies during P0/P1.
