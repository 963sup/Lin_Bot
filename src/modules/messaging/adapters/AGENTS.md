# AGENTS.md — Messaging Adapters

## Scope
適用 `src/modules/messaging/adapters/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 在邊界完成 Payload 轉換、技術例外與整合重試；不得從 Adapter 向 Domain 注入業務規則。

## Validation
- 針對映射錯誤、失敗恢復和 Port 契約建立邊界測試。
