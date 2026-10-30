# Testing and verification

Run:

```sh
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run architecture:check
pnpm run agents:check
pnpm run unused:check
pnpm run build
pnpm run format:check
```

`pnpm run check` runs lint, formatting, typecheck, tests, architecture boundaries, AGENTS coverage, unused-code checks and build. The current tests cover environment parsing and the Fastify liveness/404 routes without binding a socket or calling LINE.

The dependency-cruiser policy checks static module/layer boundaries, including type-only and literal dynamic imports; see `docs/architecture/dependency-rules.md`. When adding a new LINE adapter (P2), include synthetic payloads for invalid signatures, duplicate and delayed events, batched webhook events, reply-token constraints and error handling.

No test should depend on production credentials or personal data.

新增或移動 AGENTS 目錄時先執行 `pnpm run agents:check`；只有 AGENTS 指引或文件變更時可先跑局部檢查，再由 CI 擴大驗證。

## Tool responsibilities

- Biome handles formatting and migrated lint rules over TypeScript source/tests/scripts and root JavaScript tool configuration. Oxlint supplies four complementary checks in `.oxlintrc.json`, verified by `tests/integration/lint-policy.test.ts`. Formatting does not rewrite Markdown, YAML or unrelated JSON.
- TypeScript remains the type checker. Fastify, Vitest and tsx remain in use.
- Knip detects unused files, exports and dependencies. It discovers the HTTP entry from package scripts and test entries from its Vitest integration; `knip.json` declares engineering scripts as additional entrypoints. Do not declare every source file an entry or add broad ignores to silence findings. New workers must have real entrypoint wiring. No automatic `--fix` is used in CI.
- Build cleans `dist/` before compilation and excludes colocated tests. The test tsconfig keeps those tests included for type checking. A regression compiles to a temporary directory and verifies that test artifacts are absent.
- AGENTS tests use isolated Git repositories and a linked worktree. Architecture tests run the real CLI against synthetic dependency graphs; they do not call LINE or a database.

Run `pnpm run doctor` and `pnpm run env:check` separately for local prerequisites/configuration. See [ADR 0002](../architecture/adr/0002-quality-toolchain.md) for tool selection and remaining migration tradeoffs.
