# Engineering workflow agent and Serena

`.codex/agents/engineering-workflow.toml` defines the project role for discovery, focused changes, tool evaluation, verification, PR review and explicitly authorized merging. Select this role in a Codex host that supports project custom agents. Parsing the file does not prove that the host loaded or invoked it. It inherits repository authority and does not automatically spawn other agents.

## Efficient navigation

For symbols and references, prefer Serena's TypeScript LSP with a narrow `relative_path`. Read `initial_instructions` once per connection; in Serena v2 REPL mode, use the returned session ID and `s.info` to inspect the methods you need. Non-code files and exact strings can use `rg` and ordinary file tools. Do not read the same source again with LSP after reading the entire file.

LSP reference results depend on loaded TypeScript projects. The runtime tsconfig excludes tests; supplement impact analysis with the relevant test search and typecheck/test commands. A successful rename or symbol query does not establish business correctness.

## Serena setup and verification

The repository's `.serena/project.yml` explicitly enables the TypeScript language server and LSP backend. Cache, memories and local overrides are ignored. Install Serena v2 in your environment and make its executable available; keep machine-specific paths and `SERENA_HOME` in local host configuration.

A stdio server can be started **from the intended repository/worktree root** with:

```sh
serena start-mcp-server --project-from-cwd --context codex --agent-interface repl --enable-web-dashboard false --open-web-dashboard false
```

This is a server launch command, not an interactive shell: a client must perform the MCP handshake and call tools. Configure your Codex host to launch it using the same working directory, or pass an explicit absolute project path in local configuration. Do not commit another user's executable or worktree path. New host configuration may require a new session; this repository cannot inject tools into an already-running conversation.

Verification evidence must distinguish:

1. Installed: CLI reports a version.
2. Configured: project has a language server and correct root.
3. Connected: MCP initialize and tools/list succeed.
4. Functional: an actual symbol lookup and reference query succeed against the intended project.

If any stage fails, report that stage and the actual error. Correct the known cause before retrying; use targeted file search for independent work. Do not repeatedly reinstall tools or treat an empty language-server list as functional LSP.

## Lint replacement contract

Biome handles formatting and migrated lint checks. Oxlint supplies native checks for invalid RegExp, unexpected multiline expressions, TypeScript unused expressions and triple-slash references. It does not load JavaScript lint plugins. Before changing either tool, run the positive/negative fixtures in `tests/integration/lint-policy.test.ts` and the full check command. A different tool's speed claim is not evidence of rule parity; do not suppress a failing rule to complete a migration.

Knip checks unused files, exports and dependencies; dependency-cruiser checks permitted dependency directions; TypeScript checks types. None of these substitutes for the other tools or for behavioral tests.
