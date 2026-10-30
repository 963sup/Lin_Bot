# Architecture overview

## Current state (P0/P1)

Single Node.js 22+ TypeScript application. `src/app.ts` composes Fastify and `src/entrypoints/http.ts` starts the server. The only current route is `GET /health/live`; no LINE endpoint or database exists.

## Target state (P2+)

Use a **modular monolith** with DDD and Hexagonal boundaries per business context.

- `src/modules/<context>/domain/`: entities, value objects and business rules.
- `src/modules/<context>/application/`: use cases and output ports.
- `src/modules/<context>/adapters/inbound/`: LINE webhook translation and HTTP inputs.
- `src/modules/<context>/adapters/outbound/`: LINE SDK and persistence integrations.
- `src/bootstrap/`: assembly/configuration.
- `src/platform/`: shared technical facilities, not shared business rules.

Execution flows inward through an inbound adapter to a use case, then through output ports implemented by outbound adapters. **Source dependency direction and runtime call direction are not identical.**

See [dependency rules](dependency-rules.md). Do not create empty folders for modules that do not exist yet.
