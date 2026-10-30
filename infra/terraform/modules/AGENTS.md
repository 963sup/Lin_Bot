# AGENTS.md — Terraform 模組契約（預留）

## Scope
適用 `infra/terraform/modules/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 模組以單一基礎設施責任定義最小 inputs／outputs，不讀取環境專屬 state 或內嵌 staging／production 值。

## Validation
- 有模組後驗證輸入限制、輸出 consumer 與相依關係，避免循環依賴。
