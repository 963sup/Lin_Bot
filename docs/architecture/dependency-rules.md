# Dependency rules

1. Domain code is independent of external frameworks, SDKs, I/O, database and transport.
2. Application use cases depend on Domain and abstract ports, never concrete adapters.
3. Inbound adapters map external data to application input; outbound adapters implement output ports.
4. Bootstrap may depend on all layers to construct the dependency graph.
5. Between bounded contexts, prefer explicit application contracts over cross-domain imports.
6. Do not put business logic in `src/platform/` or create an unbounded `shared/` dumping ground.

`pnpm run architecture:check` currently inspects static import/export statements in `src/modules/*/domain/**/*.ts` using the TypeScript parser. It rejects external package imports and relative imports that escape the owning domain. This is a **partial guard**: it does not currently analyze dynamic imports or all application/adapter dependencies. Expand it alongside the actual business modules in P2.
