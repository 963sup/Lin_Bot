# AGENTS.md — Queue 技術能力（預留）

## Scope
適用 `src/platform/queue/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 只封裝 broker 連線、投遞與 ack／nack 等技術契約；用例決定業務重試語意，不宣稱基礎 Queue 提供 exactly-once。

## Validation
- 有實作後驗證重送、失敗、ack 時機與關閉；訊息遺失或重複處置須可觀察。
