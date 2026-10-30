# AGENTS.md — 程式碼治理

## Scope
適用 `src/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 遵循 TypeScript strict／ESM 與現有路徑慣例；Domain 純淨、Application 定義 Ports、Adapters 管理整合；不要混用 Layer 與 Bounded Context。

## Validation
- 先執行相關單元測試，再依變更範圍擴大到型別、邊界及建置檢查。
