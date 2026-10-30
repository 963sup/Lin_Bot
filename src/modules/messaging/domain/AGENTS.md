# AGENTS.md — Messaging Domain

## Scope
適用 `src/modules/messaging/domain/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 只承載經驗證的業務概念、規則與不變條件；禁止 LINE SDK、Fastify、ORM、檔案／網路 I/O。

## Validation
- 純函式或領域模型單元測試不依賴任何外部平台。
