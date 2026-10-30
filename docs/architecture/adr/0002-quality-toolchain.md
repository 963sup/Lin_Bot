# ADR 0002: Incremental quality-toolchain migration

- Date: 2026-10-30
- Status: Implemented on the quality-toolchain branch; CI validation is recorded in its PR.
- Updates the lint/format and boundary-checking choices in [ADR 0001](0001-engineering-foundation.md); runtime architecture is unchanged.

## Context

The initial boundary script checked only Domain static imports. Build emitted colocated tests, and the governance checker traversed gitignored caches. The user requested implementation of toolchain improvements and evaluation of Knip. The application is still a small Fastify health service, so there is no measured runtime bottleneck justifying a framework change.

## Decision

- Use pinned Biome for formatting and migrated lint rules, including `noOctal`. Pinned Oxlint supplies four complementary native checks: `no-invalid-regexp`, `no-unexpected-multiline`, TypeScript-aware `no-unused-expressions`, and `typescript/triple-slash-reference`. Only these checks are enabled in Oxlint; TypeScript-only checks are scoped to `.ts` files. Positive/negative executable fixtures guard the replacement. Remove the previous lint engine, parser/plugin packages and formatter.
- Replace the custom boundary parser with pinned dependency-cruiser and executable positive/negative policy fixtures. Explicit contracts, not folder names alone, define valid dependencies.
- Add pinned Knip as `unused:check` locally and in CI. Knip answers whether code/dependencies are used; dependency-cruiser answers whether dependencies are permitted. Entry configuration models actual scripts/tests; no automatic deletion or blanket suppression.
- Derive AGENTS coverage from Git-tracked and non-ignored untracked files. Include ancestors, support linked worktrees, and fail when Git inspection fails.
- Clean build output and exclude test files from runtime compilation while retaining them in test typechecking.
- Keep Fastify, TypeScript, Vitest, tsx, pnpm 10.20.0 and the separate Node/pnpm setup actions. The new development tools require supported Node versions declared in `package.json` (CI continues on Node 22). A pnpm 11+ / `pnpm/setup` migration is separate work, not a prerequisite for this change.

## Consequences

- More architecture and dependency mistakes fail before merge. Unused-code detection is useful as modules grow, even though today's project is small.
- Architecture and lint regression fixtures add test time. Tool changes alone do not establish faster CI or application throughput; benchmark the final commands before making performance claims.
- Static tools cannot establish transaction atomicity, ownership, delivery guarantees or runtime correctness. Computed imports and framework-discovered entries may require explicit contracts/configuration and review.
- Formatting scope stays on code and tool configuration; unrelated documentation/configuration is not reformatted. CI now runs formatting explicitly.

## References

- [Biome linter](https://biomejs.dev/linter/)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)
- [dependency-cruiser rules](https://github.com/sverweij/dependency-cruiser/blob/main/doc/rules-reference.md)
- [Knip](https://knip.dev/)
