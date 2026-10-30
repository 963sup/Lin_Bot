---
name: add-feature
description: Add one small, tested Lin_Bot feature within existing DDD/Hexagonal boundaries, reusing the current module if appropriate.
---

# Add feature (Lin_Bot)

1. Read `AGENTS.md` plus the AGENTS chain for the intended target, `docs/architecture/overview.md`, and actual relevant source/tests.
2. Identify the business goal, owning module, public contract, and minimal acceptance tests; do not invent a domain entity or Bounded Context for a simple transport feature.
3. Implement the smallest vertical slice in Domain/Application/Adapters only where justified; ports belong to the consumer and integrations stay in adapters.
4. Preserve existing naming, TypeScript ESM style, test seams and error handling.
5. Verify affected tests first; expand to `pnpm run check` and `pnpm run agents:check` if relevant.
6. Report changes, tests actually run, limits, and risks. Never add production dependencies, database changes or deployment without approval.
