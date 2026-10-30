# AGENTS.md — LINE 事件 Fixtures（預留）

## Scope
適用 `tests/fixtures/line-events/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 每份合成事件標示用途與預期結果，固定 ID、時間及資料；簽章案例須保留精確原始位元組。

## Validation
- 有 fixtures 後驗證批次、重送、亂序與未知型別覆蓋；Token 僅使用明確假值。
