# AGENTS.md — HTTP 基礎能力

## Scope
適用 `src/platform/http/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 此處維持 transport 健康檢查與通用 HTTP 輔助，不包含 LINE 事件商業決策。

## Validation
- 確認 `/health/live` contract 不變，使用 Fastify 注入測試。
