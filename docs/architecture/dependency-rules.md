# Dependency rules

1. Domain code is independent of external frameworks, SDKs, I/O, database and transport.
2. Application use cases depend on Domain and abstract ports, never concrete adapters.
3. Inbound adapters map external data to application input; outbound adapters implement output ports.
4. Bootstrap may depend on all layers to construct the dependency graph.
5. Between bounded contexts, prefer explicit application contracts over cross-domain imports.
6. Do not put business logic in `src/platform/` or create an unbounded `shared/` dumping ground.

`pnpm run architecture:check` uses dependency-cruiser and `.dependency-cruiser.mjs` to validate resolvable imports/re-exports, including type-only and literal dynamic imports. Rules apply to future modules without requiring a separate rule per context:

- Domain imports stay inside their owning domain, excluding colocated test consumers.
- Application imports only its Domain/Application, minimal shared contracts, or another module's public `index.ts`.
- Cross-context private imports are rejected; module public entries expose Application contracts, not Adapters.
- Modules/platform/shared cannot depend on bootstrap, process entrypoints or the app composition root. Platform cannot depend on business modules; shared cannot depend on other source layers.
- Cycles, unresolved dependencies, and runtime imports of tests or development packages fail the check. Colocated tests may use test packages but do not gain cross-context private access.

Regression fixtures exercise both permitted and forbidden dependencies. This remains static analysis: computed import paths, business ownership, transaction atomicity, and runtime side effects require review and behavioral tests. Pure-domain restrictions also disallow Node builtins; put I/O behind Application-owned ports.

`pnpm run unused:check` uses Knip for unused files, exports and dependencies. It complements these boundary rules; a used dependency can still violate architecture, and an allowed dependency can still be unused.
