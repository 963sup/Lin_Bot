# AGENTS.md — Serena 語意導航設定

## Scope
適用 `.serena/` 及其子目錄；只補充祖先指令，設定存在不代表目前 host 已載入 MCP。

## Local rules
- 專案設定只保留可攜式語言與忽略規則；cache、memories 與個人覆寫留在本機。
- TypeScript 專案須明確配置 `language_servers: [typescript]`；以當前 worktree 路徑啟動，不固定到另一個 checkout。
- 符號／引用工作優先採 LSP；文件與設定不強制使用語意工具。LSP 未涵蓋的測試以限定路徑搜尋補足。

## Validation
- 驗證 MCP 握手、active project、語言伺服器及實際符號／引用查詢；單純 CLI 啟動不足以聲稱可用。
