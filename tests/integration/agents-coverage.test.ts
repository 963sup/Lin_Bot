import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { checkAgentCoverage } from '../../scripts/check-agents.js';

const localInstructions = '# Local\n## Scope\n## Local rules\n## Validation\n';

function withRepository(check: (root: string) => void): void {
  const root = mkdtempSync(join(tmpdir(), 'lin-bot-agents-'));
  try {
    execFileSync('git', ['init', '--quiet', root]);
    writeFileSync(join(root, 'AGENTS.md'), '# Contract\n## Work rules (10)\n');
    check(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function write(root: string, file: string, content = ''): void {
  const path = join(root, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

describe('AGENTS coverage guard', () => {
  it('accepts the project hierarchy', () => {
    expect(checkAgentCoverage(process.cwd())).toEqual([]);
  });

  it('detects missing ancestors for new untracked files, including assets', () => {
    withRepository((root) => {
      write(root, 'src/bootstrap/config.ts');
      write(root, 'assets/line/flex/template.json', '{}');
      expect(checkAgentCoverage(root)).toEqual([
        'Missing assets/AGENTS.md',
        'Missing assets/line/AGENTS.md',
        'Missing assets/line/flex/AGENTS.md',
        'Missing src/AGENTS.md',
        'Missing src/bootstrap/AGENTS.md',
      ]);
    });
  });

  it('detects incomplete nested contracts', () => {
    withRepository((root) => {
      write(root, 'docs/AGENTS.md', '# Incomplete\n');
      expect(checkAgentCoverage(root)).toContain('Missing ## Scope in docs/AGENTS.md');
    });
  });

  it('ignores local caches, nested ignores, excluded roots and empty untracked directories', () => {
    withRepository((root) => {
      write(root, '.gitignore', '.codex/cache/\n');
      write(root, '.codex/AGENTS.md', localInstructions);
      write(root, '.codex/cache/result.json', '{}');
      write(root, '.serena/AGENTS.md', localInstructions);
      write(root, '.serena/.gitignore', '/cache/\n/memories/\n/project.local.yml\n');
      write(root, '.serena/cache/typescript/index.json', '{}');
      write(root, '.serena/memories/local.md');
      write(root, '.serena/project.local.yml');
      write(root, 'src/AGENTS.md', localInstructions);
      write(root, 'src/.gitignore', 'generated/\n');
      write(root, 'src/generated/cache.ts');
      write(root, 'unmanaged/local/file.txt');
      mkdirSync(join(root, 'src', 'empty'));
      expect(checkAgentCoverage(root)).toEqual([]);
    });
  });

  it('still checks tracked files even when later matched by gitignore', () => {
    withRepository((root) => {
      write(root, 'src/AGENTS.md', localInstructions);
      write(root, 'src/generated/code.ts');
      execFileSync('git', ['add', 'src'], { cwd: root });
      write(root, '.gitignore', 'src/generated/\n');
      expect(checkAgentCoverage(root)).toContain('Missing src/generated/AGENTS.md');
    });
  });

  it('supports spaces in file names and linked worktrees', () => {
    withRepository((root) => {
      write(root, 'docs/AGENTS.md', localInstructions);
      write(root, 'docs/file with spaces.md');
      execFileSync('git', ['add', '.'], { cwd: root });
      execFileSync(
        'git',
        [
          '-c',
          'user.name=Test',
          '-c',
          'user.email=test@example.invalid',
          'commit',
          '-qm',
          'fixture',
        ],
        { cwd: root },
      );
      const linked = `${root}-linked`;
      try {
        execFileSync('git', ['worktree', 'add', '--quiet', '--detach', linked], { cwd: root });
        expect(checkAgentCoverage(linked)).toEqual([]);
      } finally {
        execFileSync('git', ['worktree', 'remove', '--force', linked], { cwd: root });
      }
    });
  });

  it('fails closed outside a Git repository', () => {
    const root = mkdtempSync(join(tmpdir(), 'lin-bot-not-git-'));
    try {
      expect(() => checkAgentCoverage(root)).toThrow();
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
