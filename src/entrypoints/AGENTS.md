# AGENTS.md — 程序入口

## Scope
適用 `src/entrypoints/` 及其子目錄；只補充沿路適用的祖先 `AGENTS.md`，不更改全域授權與安全原則。

## Local rules
- 僅管理 HTTP/Worker 啟動與生命週期；將業務處理委派給應用層，避免在入口做網路業務決策。

## Validation
- 測試啟動錯誤與既有生命週期；若新增 Worker，先確認真實需求。
