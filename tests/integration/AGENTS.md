# AGENTS.md — 整合測試

## Scope
適用 `tests/integration/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 以 HTTP inject、記憶體替身或隔離服務驗證元件交互，不依賴線上 LINE API。

## Validation
- 固定準備與清理測試狀態；在 CI 可重現，失敗不能靠跳過掩蓋。
