# AGENTS.md — 資料庫技術能力（預留）

## Scope
適用 `src/platform/database/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 只管理連線、pool 及技術交易原語；模組 Repository 映射與業務查詢放在所屬 outbound adapter。

## Validation
- 有實作後驗證連線釋放、逾時與交易回復；不得跨模組集中資料寫入決策。
