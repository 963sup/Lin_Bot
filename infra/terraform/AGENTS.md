# AGENTS.md — Terraform（預留）

## Scope
適用 `infra/terraform/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 只有確認平台與資源需求後才加入 IaC；module 不嵌入環境憑證，state 與計畫產物不得提交。

## Validation
- 有配置後執行格式、驗證與受控 plan；plan 不等於 apply 授權或部署成功。
