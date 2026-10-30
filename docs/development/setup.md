# Local development setup

Required: Node.js 22+, pnpm 10.20.0 and Git.

```sh
corepack enable
corepack prepare pnpm@10.20.0 --activate
pnpm install
cp .env.example .env
pnpm run doctor
pnpm run env:check
pnpm dev
```

Check `GET http://127.0.0.1:3000/health/live`; expected JSON: `{"status":"ok"}`.

`.env` is ignored. Only `HOST` and `PORT` exist for P1; secrets are not required. `pnpm dev` watches source files. For a compiled run use `pnpm run build && pnpm start`.

P1 does not configure any external integration or production deployment.
