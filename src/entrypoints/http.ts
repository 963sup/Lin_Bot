import { existsSync } from 'node:fs';

import { buildApp } from '../app.js';
import { loadConfig } from '../bootstrap/config.js';

if (existsSync('.env')) process.loadEnvFile('.env');

const { host, port } = loadConfig();
const app = buildApp();

try {
  await app.listen({ host, port });
  console.info(`Lin_Bot listening on http://${host}:${port}`);
} catch (error) {
  console.error('Failed to start Lin_Bot HTTP service', error);
  process.exitCode = 1;
}
