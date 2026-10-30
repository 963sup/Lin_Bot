# AGENTS.md — Codex 專案設定

## Scope
適用 `.codex/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 僅保存可共享的 Codex 設定；個人偏好、授權與 API 金鑰不得進 Git，Agent 角色不能提升 host 權限。

## Validation
- 驗證 TOML 解析、實際設定鍵；Custom Agent 定義由 `agents/` 維護。
