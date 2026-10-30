# AGENTS.md — Messaging Application

## Scope
適用 `src/modules/messaging/application/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- Use Case 協調業務操作，外部依賴由 Application-owned Ports 表達，不能引用具體 LINE、HTTP、SQL Adapter。

## Validation
- 使用 Fake Ports 測試完整業務操作與錯誤路徑。
