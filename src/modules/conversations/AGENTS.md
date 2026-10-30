# AGENTS.md — Conversations 模組（預留）

## Scope
適用 `src/modules/conversations/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 對話與訊息責任尚待用例確認；實作前與 messaging／notifications 明確劃分唯一寫入 Owner，禁止建立重複對話模型。
- 對外只公開必要應用契約；不直接存取其他模組的 Domain、Adapter 或資料表。

## Validation
- 新增功能時驗證公開契約與不變量；目錄名稱不能作為已確認 Bounded Context 的證據。
