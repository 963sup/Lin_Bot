# Lin_Bot

LINE Messaging API Bot 的工程基礎專案。P0/P1 先建立可驗證的 TypeScript 開發環境；**目前只有 HTTP liveness endpoint，尚未接收 LINE Webhook，也未部署**。

## Requirements

- Node.js 22+
- pnpm 10.20.0（可使用 Corepack）
- Git

## Quick start

```sh
corepack enable
corepack prepare pnpm@10.20.0 --activate
pnpm install
cp .env.example .env
pnpm dev
```

啟動後請求 `GET http://127.0.0.1:3000/health/live`，預期得到 `{"status":"ok"}`。

## Quality gates

```sh
pnpm run check
pnpm run format:check
pnpm run doctor
pnpm run env:check
```

CI 另外執行 `pnpm run architecture:check`。目前只提供基礎程式、測試與規則，P2 才加入 LINE Messaging API 與 Webhook。

## Documents

- [文件目錄](docs/README.md)
- [架構概覽](docs/architecture/overview.md)
- [開發環境](docs/development/setup.md)
- [Webhook 下一階段](docs/plans/p2-line-webhook.md)
- [貢獻流程](CONTRIBUTING.md)
- [安全政策](SECURITY.md)

## Security

不要將任何 LINE Channel Secret、Channel Access Token、個資、真實 Webhook Payload 或 `.env` 提交到 Repository。
