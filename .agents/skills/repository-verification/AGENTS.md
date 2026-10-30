# AGENTS.md — Repository 驗證 Skill

## Scope
適用 `.agents/skills/repository-verification/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 此 Skill 只定義檢查順序和結果回報，需先查當前 `package.json`，不得猜測或關閉失敗的檢查。

## Validation
- 確認 `SKILL.md` 使用當前存在的命令，並分別回報未執行與執行失敗。
