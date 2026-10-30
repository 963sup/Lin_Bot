import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { expect, it } from 'vitest';

it('compiles runtime files without shipping colocated tests', () => {
  const output = mkdtempSync(join(tmpdir(), 'lin-bot-build-'));
  try {
    execFileSync(process.execPath, [
      resolve('node_modules/typescript/bin/tsc'),
      '--project',
      'tsconfig.json',
      '--outDir',
      output,
    ]);
    const files = readdirSync(output, { recursive: true, encoding: 'utf8' });
    expect(files.some((file) => file.endsWith('http.js'))).toBe(true);
    expect(files.filter((file) => /\.(test|spec)\./.test(file))).toEqual([]);
  } finally {
    rmSync(output, { recursive: true, force: true });
  }
});
