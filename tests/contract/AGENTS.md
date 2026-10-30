# AGENTS.md — 契約測試（預留）

## Scope
適用 `tests/contract/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 以受控範例驗證外部 Webhook／Port Schema；契約版本變更須更新相應 fixtures，禁止直接複製用戶資料。

## Validation
- 檢查兼容性與異常 Payload 行為；只測已實作的介面。
