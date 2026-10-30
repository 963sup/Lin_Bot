# Testing and verification

Run:

```sh
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run architecture:check
pnpm run build
pnpm run format:check
```

`pnpm run check` runs lint, typecheck, tests, architecture guard and build. The current tests cover environment parsing and the Fastify liveness/404 routes without binding a socket or calling LINE.

The architecture script is a partial guard for future Domain code; see `docs/architecture/dependency-rules.md`. When adding a new LINE adapter (P2), include synthetic payloads for invalid signatures, duplicate and delayed events, batched webhook events, reply-token constraints and error handling.

No test should depend on production credentials or personal data.
