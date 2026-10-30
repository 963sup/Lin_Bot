import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { checkAgentCoverage } from '../../scripts/check-agents.js';

describe('AGENTS coverage guard', () => {
  it('accepts the project hierarchy', () => {
    expect(checkAgentCoverage(process.cwd())).toEqual([]);
  });

  it('detects missing nested instructions', () => {
    const temp = mkdtempSync(join(tmpdir(), 'lin-bot-agents-'));
    try {
      writeFileSync(join(temp, 'AGENTS.md'), '# Contract\n## Work rules (10)\n');
      mkdirSync(join(temp, 'src', 'bootstrap'), { recursive: true });
      const issues = checkAgentCoverage(temp);
      expect(issues).toContain('Missing src/AGENTS.md');
      expect(issues).toContain('Missing src/bootstrap/AGENTS.md');
    } finally {
      rmSync(temp, { recursive: true, force: true });
    }
  });

  it('detects incomplete nested contracts', () => {
    const temp = mkdtempSync(join(tmpdir(), 'lin-bot-agents-'));
    try {
      writeFileSync(join(temp, 'AGENTS.md'), '# Contract\n## Work rules (10)\n');
      mkdirSync(join(temp, 'docs'));
      writeFileSync(join(temp, 'docs', 'AGENTS.md'), '# Incomplete\n');
      expect(checkAgentCoverage(temp)).toContain('Missing ## Scope in docs/AGENTS.md');
    } finally {
      rmSync(temp, { recursive: true, force: true });
    }
  });
});
