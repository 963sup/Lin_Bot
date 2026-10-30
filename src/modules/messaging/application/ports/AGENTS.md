# AGENTS.md — Outbound Ports

## Scope
適用 `src/modules/messaging/application/ports/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- Ports 由消費方需求定義最小能力；介面語言應是業務語言，不包含 ORM／LINE SDK 專屬型別。

## Validation
- 以 Fake 或 Stub 驗證 Port 契約，不要求真實憑證或外部網路。
