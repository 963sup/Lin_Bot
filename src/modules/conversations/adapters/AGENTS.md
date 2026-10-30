# AGENTS.md — Conversation Adapters（預留）

## Scope
適用 `src/modules/conversations/adapters/` 及其子目錄；沿用祖先指令鏈。本目錄目前僅有治理指引，尚未提供對應實作或可執行設定。

## Local rules
- 負責協定映射、技術錯誤轉換與具體整合；業務決策交給用例及 Domain，不互相呼叫來繞過應用層。

## Validation
- 以 Port 契約檢查映射與失敗語意；確認外部型別未滲入核心。
