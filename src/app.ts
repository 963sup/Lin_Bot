import Fastify, { type FastifyInstance } from 'fastify';

import { registerHealthRoutes } from './platform/http/health.js';

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false });
  registerHealthRoutes(app);
  return app;
}
