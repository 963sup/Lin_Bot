# AGENTS.md — Notification Domain（預留）

## Scope
適用 `src/modules/notifications/domain/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 只承載已確認的通知規則與不變量；禁止依賴 LINE、排程器、Queue、資料庫或其他層。

## Validation
- 有規則後以純單元測試驗證資格、狀態及邊界；不為示例目錄捏造領域模型。
