# AGENTS.md — Skill 入口與命名

## Scope
適用 `.agents/skills/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 每個可用 Skill 目錄以 `SKILL.md` 記錄 name、description、適用時機及明確驗證；只讀取任務相關技能。
- 使用者指定的預留目錄可先只有 `AGENTS.md`；建立並驗證 `SKILL.md` 前，不列為可執行技能。

## Validation
- 校驗新增 Skill 的 frontmatter，測試或操作不可使用正式環境憑證。
