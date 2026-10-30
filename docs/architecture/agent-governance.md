# Lin_Bot nested AGENTS governance

## Authority and scope

1. `/AGENTS.md` is the **single authority** for the ten work rules, shared authorization limits, security invariants, and general DDD/Hexagonal goals.
2. Every tracked directory under `.github/`, `.codex/`, `.serena/`, `.agents/`, `.vscode/`, `.devcontainer/`, `docs/`, `scripts/`, `src/`, `tests/`, `infra/`, `db/`, or `assets/` has a local `AGENTS.md`.
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
- **Engineering workflow role:** `.codex/agents/engineering-workflow.toml` covers scoped discovery, Serena semantic navigation, implementation, tool evaluation, verification and authorized PR delivery. See the [usage guide](../development/engineering-agent.md); it inherits repository authority and does not imply a host has loaded it.
- **Serena project configuration:** `.serena/project.yml` enables TypeScript LSP with portable settings. Local caches/memories are ignored; MCP connectivity must be verified separately from file presence.

## Requested directory coverage

The requested `line-bot/` tree maps to this repository root; it does not create another nested application. Each requested directory has local guidance, including optional directories. Existing guidance and paths are retained.

- `.github/instructions/`, `.github/prompts/`: reserved Copilot rules and prompt scopes.
- `.agents/skills/add-use-case/`, `investigate-incident/`, `release-check/`: reserved skill scopes; they are not runnable skills until a valid `SKILL.md` exists. `line-webhook/references/` reserves synthetic event references.
- `docs/product/`, `docs/api/`, `docs/security/`: reserved product, contract and security knowledge.
- `infra/terraform/modules/bot-service/`, `infra/terraform/environments/{staging,production}/`, `infra/observability/{dashboards,alerts}/`: reserved infrastructure scopes, with guidance at every ancestor.
- `db/{migrations,seeds}/`, `assets/line/{flex,rich-menu}/`: reserved data management and static asset scopes.
- `src/modules/conversations/`: reserved Domain (including events), Application (use cases and ports) and inbound/outbound adapter scopes. `src/modules/notifications/` is a proposed example context with Domain/Application/Adapters guidance.
- `src/platform/{database,queue,telemetry}/`, `src/shared/errors/`: reserved technical and minimal shared contract scopes.
- `tests/e2e/`, `tests/fixtures/line-events/`, `tests/helpers/`: reserved system testing, synthetic events and test support scopes.

All paths listed above currently contain governance only. The illustrative application files, deployment workflows, Terraform, SQL, assets and container configuration have not been implemented by adding these instructions. Existing `messaging/` remains reserved: confirm ownership before implementing it alongside `conversations/` or `notifications/`; do not duplicate business models across them.

## Change and validation

- Add a directory inside managed roots → add its local `AGENTS.md` (Scope, Local rules, Validation).
- Modify a parent contract → check all affected child contracts and consumers; do not duplicate authority.
- Run `pnpm run agents:check` for structural coverage and `pnpm run test` for checker behavior. Normal code changes additionally use the appropriate existing package scripts and CI.
- The checker verifies presence, minimal sections and size, **not semantic consistency**. PR review remains required for contradictions, stale links and unsafe exceptions.
- Coverage is derived from Git-tracked and non-ignored untracked files, including their ancestor directories. Ignored local caches and empty untracked directories are not governed. Tracked files remain governed even if a later ignore rule matches them. Git failures stop the check; run it from the repository root (linked worktrees are supported).
- Do not auto-generate meaningless `domain/`, `application/`, `infra/` runtime components merely to match the governance tree.
