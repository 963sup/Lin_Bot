# AGENTS.md — Conversation Application（預留）

## Scope
適用 `src/modules/conversations/application/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 用例協調 Domain 與消費方定義的 Ports；禁止直接引用具體 Adapter、HTTP、SQL 或 LINE SDK。
- 必須明示交易範圍與外部副作用順序；跨系統操作不能假設有單一原子交易。

## Validation
- 使用 Fake Ports 驗證成功、失敗及重試；驗證資料一致性與副作用恢復契約。
