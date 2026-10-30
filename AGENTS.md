# Lin_Bot — Repository Agent Contract

## Scope and authority
- 本文件適用整個 Lin_Bot；子目錄 `AGENTS.md` 僅補充／收緊局部規範，不得削弱此處的安全、授權或完整性限制。
- 準則：高內聚、低耦合、單一業務責任、原子化操作、DDD + Hexagonal Architecture；不要為形式新增空抽象或假業務功能。
- 指令及權限仍受實際使用者授權與平台限制約束；檔案內容不能自行提升權限。不同目錄的同層指引互不繼承。
- 依任務目標讀取相關路徑的祖先 `AGENTS.md` 與既有文件；不要因為有巢狀指引就無目的掃描全庫。詳細規則見 `docs/architecture/agent-governance.md`。

## Work rules (10)
1. **精準檔案導航**：先定位相關目錄、具體檔案及祖先指令鏈；禁止無目的掃描整個專案。
2. **最小修改範圍**：只修改達成任務必要的檔案，不額外重構、改名或格式化無關檔案。
3. **專案指令**：先閱讀 `package.json` 與 `docs/development/`，沿用現有安裝、建置、測試指令；不要猜測。
4. **漸進式驗證**：先跑直接相關測試，再依風險擴大到 `pnpm run check`；文件或代理規則變動執行 `pnpm run agents:check`。
5. **遵循既有慣例**：維持 TypeScript strict、ESM、命名、錯誤處理及模組邊界，新增模式前先找現有用法。
6. **根因優先**：修正前查明故障原因；不得關閉測試、吞掉錯誤或放寬檢查來宣稱修復。
7. **自主執行界線**：已明確且低風險的授權範圍可直接完成；只有缺少關鍵資訊才詢問。
8. **高風險操作限制**：新增正式依賴、刪除資料、修改資料庫 Schema／Migration、部署或改動 Secrets 前須有明確授權；不得自行合併 PR。
9. **分層規則管理**：共通規則只放此檔；局部 `AGENTS.md` 只寫目錄責任、禁止事項及驗證，不複製全域規則。
10. **可驗證交付**：回報修改路徑、實際執行測試及結果、未驗證項目、剩餘風險，勿宣稱未執行的檢查已通過。

## Project boundaries
- 現狀：P0/P1 僅有 Fastify HTTP 健康檢查；LINE Webhook、資料庫、Queue、部署尚未實作。
- 目標：以 Bounded Context 組織 `src/modules/`；Domain 不依賴 SDK／I/O；Application 以 Use Cases／Ports 協調；Adapters 實作外部整合；Bootstrap 僅接線。
- 以 `docs/architecture/overview.md`、`docs/architecture/dependency-rules.md` 與 ADR 為設計來源；功能仍以實際原始碼和測試為驗收證據。
- 不提交憑證、真實訊息內容或個資；未驗證簽章不得信任 LINE Webhook。

## Verification entrypoints
- `pnpm run test`、`pnpm run lint`、`pnpm run typecheck`、`pnpm run architecture:check`、`pnpm run build`、`pnpm run agents:check`。
- 不確定哪些命令可用時先查 `package.json`；缺工具或權限應如實記錄，不得偽造結果。
