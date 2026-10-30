# AGENTS.md — Conversation Domain（預留）

## Scope
適用 `src/modules/conversations/domain/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 只描述對話業務概念、值物件、聚合與不變量；不得依賴 Application、SDK、資料庫或任何 I/O。

## Validation
- 有模型後以純單元測試驗證合法與非法狀態；聚合邊界須有實際一致性需求。
