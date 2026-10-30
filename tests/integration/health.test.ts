import { describe, expect, it } from 'vitest';

import { buildApp } from '../../src/app.js';

describe('HTTP health endpoint', () => {
  it('responds to liveness checks without external services', async () => {
    const app = buildApp();
    try {
      const response = await app.inject({ method: 'GET', url: '/health/live' });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ status: 'ok' });
    } finally {
      await app.close();
    }
  });
  it('does not expose a LINE webhook before P2', async () => {
    const app = buildApp();
    try {
      const response = await app.inject({ method: 'POST', url: '/webhook' });
      expect(response.statusCode).toBe(404);
    } finally {
      await app.close();
    }
  });
});
