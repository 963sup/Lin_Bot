# AGENTS.md — Bot Service 模組（預留）

## Scope
適用 `infra/terraform/modules/bot-service/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 只管理服務執行所需資源，資料庫及其他責任經明確輸入契約整合；不得吸收所有基礎設施。

## Validation
- 有資源後驗證服務輸出、最小權限與變更計畫，不以建立宣告代替服務健康證據。
