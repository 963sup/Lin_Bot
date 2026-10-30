# AGENTS.md — Notification Application（預留）

## Scope
適用 `src/modules/notifications/application/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 以單一通知意圖協調 Domain 與消費方 Ports；不可引用具體 Adapter 或直接查詢其他模組資料。
- 明示通知狀態更新與投遞副作用的失敗、重試及冪等契約，不能把送出請求當送達。

## Validation
- 有用例後使用 Fake Ports 驗證成功、失敗、重複及部分完成；跨系統一致性以可觀察證據確認。
