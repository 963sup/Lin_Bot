export interface AppConfig {
  readonly host: string;
  readonly port: number;
}

export function parsePort(value: string | undefined): number {
  if (value === undefined) return 3000;
  if (!/^\d+$/.test(value)) throw new Error('PORT must be an integer between 1 and 65535');
  const port = Number(value);
  if (!Number.isSafeInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }
  return port;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return { host: env.HOST || '127.0.0.1', port: parsePort(env.PORT) };
}
