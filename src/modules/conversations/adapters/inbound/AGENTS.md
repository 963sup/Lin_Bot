# AGENTS.md — Conversation Inbound（預留）

## Scope
適用 `src/modules/conversations/adapters/inbound/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 當收到 LINE Webhook → 以原始 Body 驗簽 → 驗證成功後解析並映射為應用輸入；簽章錯誤即停止業務處理。
- 路由只處理協定與用例委派；明確區分批次接收、個別事件處理與未知型別行為。

## Validation
- 以合成 payload 測試錯誤簽章、原始位元組變動、批次與未知事件；不得將未知處理結果默認成功。
