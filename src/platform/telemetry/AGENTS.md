# AGENTS.md — Telemetry（預留）

## Scope
適用 `src/platform/telemetry/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 只提供 logger、metrics、tracing 的技術介面；業務事件含義由模組決定，欄位採必要且脫敏資料。

## Validation
- 有實作後驗證敏感欄位遮罩、追蹤關聯與故障處理；可觀察性失敗不得掩蓋業務錯誤。
