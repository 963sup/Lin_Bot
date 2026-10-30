import { describe, expect, it } from 'vitest';

import { loadConfig, parsePort } from './config.js';

describe('app configuration', () => {
  it('defaults to a local port', () => {
    expect(loadConfig({})).toEqual({ host: '127.0.0.1', port: 3000 });
  });
  it('accepts a valid port', () => {
    expect(parsePort('8080')).toBe(8080);
  });
  it.each(['0', '65536', '-1', 'abc', '80.5', ''])('rejects invalid PORT: %s', (value) => {
    expect(() => parsePort(value)).toThrow('PORT');
  });
});
