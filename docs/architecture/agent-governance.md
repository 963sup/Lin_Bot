# Lin_Bot nested AGENTS governance

## Authority and scope

1. `/AGENTS.md` is the **single authority** for the ten work rules, shared authorization limits, security invariants, and general DDD/Hexagonal goals.
2. Every tracked directory under `.github/`, `.codex/`, `.agents/`, `.vscode/`, `.devcontainer/`, `docs/`, `scripts/`, `src/`, `tests/`, `infra/`, or `db/` has a local `AGENTS.md`.
3. Local files only add path-specific rules and validation; sibling directories do not inherit from one another. Lower scopes may tighten but must not bypass root safety/authorization rules.
4. For a task, locate the target path and consult only the applicable ancestor chain. Only repository-wide governance audits need inspect all managed AGENTS files.
5. `AGENTS.md` is developer guidance, not evidence of runtime support or permission. A host's actual instruction loading and capabilities need separate verification.

## Hierarchy example

```text
AGENTS.md                                    # root work contract
└── src/AGENTS.md                            # source conventions
    └── src/modules/AGENTS.md                # bounded context ownership
        └── src/modules/messaging/AGENTS.md  # reserved business module
            └── application/AGENTS.md       # use cases and ports
                └── ports/AGENTS.md         # consumer-owned ports
```

The instruction file named `AGENTS.md` is present in each ancestor directory above even when the example omits the full path for readability.

## Directory status

- **Implemented now:** Fastify liveness, config, tests, build and CI, documented in `docs/architecture/overview.md`.
- **Governance-only placeholders:** `src/modules/messaging/`, `db/`, `infra/`, `.devcontainer/`, `docs/line/`, `tests/contract/`, `tests/fixtures/`, and optional Copilot agents. An `AGENTS.md` under these paths **does not create a working component**.
- **Dedicated Codex author:** `.codex/agents/agents-md-author.toml` defines a helper role; it does not automatically run, confer additional permission, or prove any host loaded it.

## Change and validation

- Add a directory inside managed roots → add its local `AGENTS.md` (Scope, Local rules, Validation).
- Modify a parent contract → check all affected child contracts and consumers; do not duplicate authority.
- Run `pnpm run agents:check` for structural coverage and `pnpm run test` for checker behavior. Normal code changes additionally use the appropriate existing package scripts and CI.
- The checker verifies presence, minimal sections and size, **not semantic consistency**. PR review remains required for contradictions, stale links and unsafe exceptions.
- Do not auto-generate meaningless `domain/`, `application/`, `infra/` runtime components merely to match the governance tree.
