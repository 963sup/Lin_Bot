# AGENTS.md — Webhook 參考案例（預留）

## Scope
適用 `.agents/skills/line-webhook/references/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 案例必須標明官方來源、適用事件與預期結果；合成事件涵蓋重送、批次、亂序及未知型別。

## Validation
- 核對與上層技能的驗簽及 Reply Token 契約一致；未知事件不可寫成處理成功。
