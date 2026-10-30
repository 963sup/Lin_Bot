# AGENTS.md — CI／安全工作流程

## Scope
適用 `.github/workflows/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 保持 `GITHUB_TOKEN` 最小權限、安裝依賴使用現有 frozen lockfile；新增部署步驟必須另行授權。

## Validation
- 驗證 YAML、觸發事件與相關 Jobs；功能性工作流程以實際 GitHub Actions 結果為準。
