# AGENTS.md

## Project

Lin_Bot is a TypeScript LINE Messaging API Bot. P0/P1 provides engineering foundations only. P2 will implement LINE Webhook handling.

## Single sources of truth

- Architecture: `docs/architecture/overview.md`
- Dependency rules: `docs/architecture/dependency-rules.md`
- Development: `docs/development/setup.md`
- Upcoming webhook scope: `docs/plans/p2-line-webhook.md`

## Architecture rules

- Organize future business code under `src/modules/<bounded-context>/`.
- Domain code must not import frameworks, SDKs, storage drivers or other application layers.
- Application use cases own orchestration and define ports for external services.
- Inbound/outbound adapters own LINE SDK and persistence integration.
- `src/bootstrap/` wires dependencies. Do not place business decisions in HTTP routes.
- Avoid premature infrastructure (database, queue, workers) without a concrete use case.

## Working agreement

- Keep changes focused; update documentation when behavior changes.
- Add relevant tests for every behavioral change.
- Run `pnpm run check` and `pnpm run format:check` before requesting review.
- Use the `repository-verification` skill when changing runtime, tests or tooling.
- Use the `line-webhook` skill before implementing LINE events.
- Do not merge, deploy, rotate credentials or change repository settings without explicit authorization.

## Security

- Never commit or print secrets or raw user messages.
- Do not bypass signature verification when implementing LINE Webhook.
- Handle retries and event deduplication when P2 is implemented.
- Tests must not require real LINE credentials or call production APIs.

## Reporting

Summarize changed files, commands run, results, and unresolved risks. Distinguish actual verification from intended verification.
