import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

const repositoryRoot = process.cwd();

function inspect(files: Record<string, string>): { status: number | null; report: string } {
  const root = mkdtempSync(join(tmpdir(), 'lin-bot-boundaries-'));
  try {
    copyFileSync(resolve('tsconfig.json'), join(root, 'tsconfig.json'));
    copyFileSync(resolve('.dependency-cruiser.mjs'), join(root, '.dependency-cruiser.mjs'));
    writeFileSync(
      join(root, 'package.json'),
      JSON.stringify({ type: 'module', devDependencies: { vitest: '*' } }),
    );
    symlinkSync(join(repositoryRoot, 'node_modules'), join(root, 'node_modules'), 'junction');
    for (const [file, source] of Object.entries(files)) {
      const path = join(root, file);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, source);
    }
    const result = spawnSync(
      process.execPath,
      [
        join(repositoryRoot, 'node_modules/dependency-cruiser/bin/dependency-cruiser.mjs'),
        '--config',
        join(root, '.dependency-cruiser.mjs'),
        '--output-type',
        'err',
        'src',
      ],
      { cwd: root, encoding: 'utf8' },
    );
    if (result.error) throw result.error;
    if (!result.stdout) throw new Error(result.stderr || 'Dependency analysis produced no report.');
    return { status: result.status, report: result.stdout + result.stderr };
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

describe('architecture policy', () => {
  it('permits inward dependencies, public application contracts and colocated tests', () => {
    const result = inspect({
      'src/modules/a/domain/entity.ts': 'export const entity = 1;',
      'src/modules/a/application/run.ts':
        "export { entity } from '../domain/entity.js'; export { send } from '../../b/index.js';",
      'src/modules/a/adapters/inbound/route.ts':
        "export { entity } from '../../application/run.js';",
      'src/modules/a/domain/entity.test.ts':
        "import { expect } from 'vitest'; import { entity } from './entity.js'; expect(entity).toBe(1);",
      'src/modules/b/index.ts': "export { send } from './application/send.js';",
      'src/modules/b/application/send.ts': 'export const send = () => 1;',
    });
    expect(result.status).toBe(0);
    expect(result.report).toContain('no dependency violations found');
  });

  it.each([
    {
      label: 'domain imports Node I/O dynamically',
      files: { 'src/modules/a/domain/entity.ts': "export const load = () => import('node:fs');" },
      rule: 'domain-is-contained',
    },
    {
      label: 'application imports a concrete adapter through a type-only edge',
      files: {
        'src/modules/a/application/run.ts':
          "export type { Adapter } from '../adapters/outbound/repository.js';",
        'src/modules/a/adapters/outbound/repository.ts':
          'export interface Adapter { save(): void }',
      },
      rule: 'application-depends-on-contracts',
    },
    {
      label: 'cross-context private import',
      files: {
        'src/modules/a/adapters/route.ts': "export { entity } from '../../b/domain/entity.js';",
        'src/modules/b/domain/entity.ts': 'export const entity = 1;',
      },
      rule: 'no-cross-module-internals',
    },
    {
      label: 'public API re-exports an adapter',
      files: {
        'src/modules/a/index.ts': "export { adapter } from './adapters/adapter.js';",
        'src/modules/a/adapters/adapter.ts': 'export const adapter = 1;',
      },
      rule: 'module-api-only-application-contracts',
    },
    {
      label: 'circular domain dependencies',
      files: {
        'src/modules/a/domain/a.ts': "import './b.js'; export const a = 1;",
        'src/modules/a/domain/b.ts': "import './a.js'; export const b = 1;",
      },
      rule: 'no-cycles',
    },
    {
      label: 'runtime source imports its test',
      files: {
        'src/app.ts': "import './app.test.js';",
        'src/app.test.ts': 'export const test = 1;',
      },
      rule: 'production-does-not-import-tests',
    },
    {
      label: 'runtime source imports a dev dependency',
      files: { 'src/app.ts': "export { expect } from 'vitest';" },
      rule: 'production-does-not-import-dev-dependencies',
    },
    {
      label: 'unresolved dependency',
      files: { 'src/app.ts': "import './missing.js';" },
      rule: 'no-unresolved',
    },
  ])('rejects $label', ({ files, rule }) => {
    const result = inspect(files);
    expect(result.status).not.toBe(0);
    expect(result.report).toContain(rule);
  });
});
