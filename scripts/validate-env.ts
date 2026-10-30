import { existsSync } from 'node:fs';

import { loadConfig } from '../src/bootstrap/config.js';

if (existsSync('.env')) process.loadEnvFile('.env');

try {
  const config = loadConfig();
  console.info(`Environment is valid: HOST=${config.host}, PORT=${config.port}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Invalid environment');
  process.exitCode = 1;
}
