---
name: repository-verification
description: Run Lin_Bot verification when runtime code, tests, build configuration, or engineering scripts change.
---

# Repository verification

1. Read `AGENTS.md` and `docs/development/testing.md`.
2. Run `pnpm run lint`.
3. Run `pnpm run typecheck`.
4. Run `pnpm run test`.
5. Run `pnpm run architecture:check`, `pnpm run unused:check` and `pnpm run build`.
6. For AGENTS or directory changes run `pnpm run agents:check` and inspect the applicable root-to-leaf instruction chain.
7. Run `pnpm run format:check` on changes within its configured scope.
8. If commands cannot run, report exactly which were blocked and why.
9. Report pass/fail evidence and do not claim an unexecuted check passed.
