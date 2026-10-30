import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

function inspect(source: string, extension = 'ts') {
  const root = mkdtempSync(join(tmpdir(), 'lin-bot-lint-'));
  try {
    const file = join(root, `fixture.${extension}`);
    writeFileSync(file, source);
    const result = spawnSync(
      process.execPath,
      [resolve('node_modules/oxlint/bin/oxlint'), '-c', resolve('.oxlintrc.json'), file],
      { encoding: 'utf8' },
    );
    if (result.error) throw result.error;
    return { status: result.status, report: result.stdout + result.stderr };
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

describe('complementary lint policy', () => {
  it.each([
    { rule: 'no-invalid-regexp', source: "new RegExp('[');" },
    { rule: 'no-unexpected-multiline', source: 'const value = Math.random\n(1);' },
    { rule: 'no-unused-expressions', source: '42;' },
    { rule: 'no-unused-expressions', source: 'declare const value: string; value!;' },
    { rule: 'no-unused-expressions', source: 'declare const value: string; value as string;' },
    {
      rule: 'triple-slash-reference',
      source: '/// <reference path="./missing.d.ts" />\nexport {};',
    },
  ])('rejects $rule: $source', ({ rule, source }) => {
    const result = inspect(source);
    expect(result.status).toBe(1);
    expect(result.report).toContain(rule);
  });

  it('accepts valid patterns, calls, imports and type assertions used by calls', () => {
    const result = inspect(
      "import type { Value } from './value.js';\n" +
        "new RegExp('[a-z]+');\nconst value = Math.random();\n" +
        'console.log(value as Value);\n',
    );
    expect(result.status).toBe(0);
    expect(result.report).not.toContain('error');
  });

  it('retains JavaScript regexp checks without enabling TypeScript-only expression policy', () => {
    expect(inspect('42;', 'mjs').status).toBe(0);
    const result = inspect("new RegExp('[');", 'mjs');
    expect(result.status).toBe(1);
    expect(result.report).toContain('no-invalid-regexp');
  });
});
