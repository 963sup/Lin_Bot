# AGENTS.md — Production（預留）

## Scope
適用 `infra/terraform/environments/production/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 變更前必須具備明確目標、授權、審閱計畫與回復策略；測試環境驗證不得當成正式部署證據。

## Validation
- 確認候選版本、目標帳號、state 與部署後觀察；不滿足前置條件即停止。
