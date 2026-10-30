# AGENTS.md — Staging（預留）

## Scope
適用 `infra/terraform/environments/staging/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 只使用測試資源及合成資料；不得引用 production state、憑證或資料來源。

## Validation
- 有配置後核對環境標籤與資源目標，記錄 plan 和受控 smoke test 結果。
