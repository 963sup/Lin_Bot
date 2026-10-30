# AGENTS.md — 工程腳本

## Scope
適用 `scripts/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 腳本必須任務單一、退出碼可信；預設採乾跑或可重複操作，破壞性指令要授權與保護。

## Validation
- 以既有 `pnpm run` 入口執行，測試失敗情境及可重現輸出。
