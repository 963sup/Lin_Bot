---
name: line-webhook
description: Use when implementing or changing LINE Messaging API Webhook verification, event handling, reply messages, or retry behavior.
---

# LINE Webhook implementation

This skill applies from P2; P0/P1 must not add live LINE integration.

1. Read `docs/plans/p2-line-webhook.md` and the current LINE Messaging API documentation.
2. Verify signatures against the original, unmodified request body before trusting events.
3. Normalize external payloads at the inbound adapter; keep the LINE SDK out of Domain.
4. Handle batched, repeated, delayed and out-of-order events; design persistent idempotency when needed.
5. Preserve reply-token single-use and short-lifetime constraints.
6. Provide synthetic fixtures and unit/integration tests; do not use real user data.
7. Run the repository-verification skill and document limitations.
