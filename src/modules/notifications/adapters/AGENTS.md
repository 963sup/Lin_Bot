# AGENTS.md — Notification Adapters（預留）

## Scope
適用 `src/modules/notifications/adapters/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 只處理輸入映射或實作應用輸出 Port；SDK、傳輸與排程細節留在邊界，通知資格由核心決定。

## Validation
- 有整合後驗證錯誤映射、速率限制與重試結果；未授權不得發送正式通知。
