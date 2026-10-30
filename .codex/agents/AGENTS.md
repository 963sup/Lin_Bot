# AGENTS.md — Codex 專業 Subagents

## Scope
適用 `.codex/agents/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 每個角色一個 TOML；需有 `name`、`description`、`developer_instructions`，只定義工作邊界，不假設其有額外工具權限。

## Validation
- 先參照 `agents-md-author.toml` 和 Codex 文件校驗 TOML；載入成功仍須由實際 Codex session 驗證。
