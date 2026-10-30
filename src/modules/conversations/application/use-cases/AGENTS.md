# AGENTS.md — Conversation Use Cases（預留）

## Scope
適用 `src/modules/conversations/application/use-cases/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 一個用例對應單一業務意圖，不把每個私有步驟拆成用例；列出前置條件、後置條件與失敗處置。
- 當處理重送事件 → 依明確冪等契約執行或略過副作用 → 驗證結果；並行重送不得只靠先查後寫。

## Validation
- 有流程後測試正常、重複、並行與部分失敗；需可靠投遞時驗證持久化及重試設計，不把嘗試當成功。
