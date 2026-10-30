# AGENTS.md — 測試策略

## Scope
適用 `tests/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- Unit 依被測模組就近管理；集中目錄只放跨模組 Integration／Contract／Fixtures，不把所有測試塞成單一巨檔。

## Validation
- 先執行相關測試，再擴大套件；每個新測試能獨立重現且不需要正式憑證。
