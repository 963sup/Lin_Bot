# AGENTS.md — 資料遷移（預留）

## Scope
適用 `db/migrations/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 每次 migration 對應單一可審閱目的；已套用版本不可改寫，跨版本相容性與資料回復方式須明確。

## Validation
- 有 migration 後在隔離資料庫測試套用、失敗與重試；無法 rollback 時明示備份還原或前向修復方案。
