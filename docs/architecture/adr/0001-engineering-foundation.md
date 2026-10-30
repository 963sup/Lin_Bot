# ADR 0001: Single-package modular monolith foundation

- Date: 2026-10-31
- Status: Accepted for P0/P1

## Context

The GitHub Repository was empty. There are no confirmed LINE Bot business rules, persistent data requirements or deployment target.

## Decision

Use one pnpm-managed TypeScript package (Node.js 22+, Fastify) with Vitest, automated lint/format checks and GitHub Actions (quality tools updated by [ADR 0002](0002-quality-toolchain.md)). Establish AGENTS.md, repo-local skills and the architecture boundary document. Implement only a non-sensitive health endpoint now. Plan DDD/Hexagonal module boundaries without fabricating business features.

## Consequences

- Easy to run and maintain as a single service.
- Future business modules can adopt independent Domain/Application/Adapters boundaries.
- No database, queue, webhook, infra provisioning or release/deployment workflow until their requirements are known.
- A generated pnpm lockfile is committed and CI uses frozen installation. Production deployment still requires a separate operational readiness review.
