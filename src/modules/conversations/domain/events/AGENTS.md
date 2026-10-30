# AGENTS.md — 領域事件（預留）

## Scope
適用 `src/modules/conversations/domain/events/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 事件表示已發生的業務事實，使用業務語言與必要識別，不攜帶 LINE payload、SDK 型別或傳輸行為。

## Validation
- 有事件後驗證產生條件與不變量；需對外發布時由應用層映射整合契約，不在此發送事件。
