# AGENTS.md — 共用錯誤契約（預留）

## Scope
適用 `src/shared/errors/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 僅定義跨模組必要的最小錯誤語意；特定領域錯誤留在模組，HTTP status 與 SDK 錯誤轉換留在 Adapter。

## Validation
- 有錯誤契約後驗證 consumers 的分支及未知錯誤處理；不暴露底層查詢、憑證或個資。
