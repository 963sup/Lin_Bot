# AGENTS.md — Bounded Context 模組

## Scope
適用 `src/modules/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 每個模組有單一業務 Owner，禁止跨模組直接匯入 private internals；Public API 僅公開真正需要的契約。

## Validation
- 新增業務模組先明確責任與使用者，再執行跨層／跨模組 Import 驗證。
