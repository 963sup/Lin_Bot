# AGENTS.md — 環境組裝（預留）

## Scope
適用 `infra/terraform/environments/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 環境層只組裝 modules 與非機密參數；staging／production 的 state、帳號與憑證必須隔離。

## Validation
- 執行前確認目標帳號與 state；無法辨識環境時停止，不預設為安全環境。
