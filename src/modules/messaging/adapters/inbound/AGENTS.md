# AGENTS.md — Inbound / LINE（預留）

## Scope
適用 `src/modules/messaging/adapters/inbound/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 若新增 Webhook，必須先用原始 Body 驗簽，再解析及映射；批次、重送、亂序要有設計與測試。

## Validation
- 以合成 LINE Fixtures 測試錯誤簽章和事件型別，不連正式 Channel。
