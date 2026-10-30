# AGENTS.md — Conversation Outbound（預留）

## Scope
適用 `src/modules/conversations/adapters/outbound/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 實作應用 Port，封裝 LINE SDK 與持久化映射；不得修改其他模組擁有的資料或將 Reply Token 細節暴露給 Domain。
- 網路 timeout 可能代表結果未知；重試前依副作用及 Token 契約判斷，不盲目重送。

## Validation
- 有 Adapter 後驗證 Port 契約、交易回復、逾時與重試；測試使用替身或隔離服務。
