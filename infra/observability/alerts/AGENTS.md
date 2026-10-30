# AGENTS.md — 告警（預留）

## Scope
適用 `infra/observability/alerts/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 每項告警定義觸發條件、持續時間、Owner、處置連結與解除條件；避免重複訊號造成告警風暴。

## Validation
- 使用合成訊號驗證觸發、恢復、無資料分支；未授權不得發送正式通知。
