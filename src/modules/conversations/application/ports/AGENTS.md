# AGENTS.md — Conversation Ports（預留）

## Scope
適用 `src/modules/conversations/application/ports/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 介面依消費方業務需求定義最小能力；不暴露 ORM、HTTP 或 LINE SDK 型別，不建立萬用 Repository。

## Validation
- 有 Port 後以 Fake／契約測試驗證回傳、失敗及一致性語意；交易能力僅在用例需要時定義。
