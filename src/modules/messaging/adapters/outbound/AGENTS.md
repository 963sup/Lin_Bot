# AGENTS.md — Outbound / LINE（預留）

## Scope
適用 `src/modules/messaging/adapters/outbound/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 實作 Application Ports 時才引入 SDK；Reply Token、速率、網路失敗與副作用不得直接暴露給 Domain。

## Validation
- 使用 Mock SDK／Contract Tests，禁止在測試中發送正式 LINE 訊息。
