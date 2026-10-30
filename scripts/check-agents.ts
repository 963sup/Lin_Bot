import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const governanceRoots = [
  '.github',
  '.codex',
  '.agents',
  '.vscode',
  '.devcontainer',
  'docs',
  'scripts',
  'src',
  'tests',
  'infra',
  'db',
] as const;

const ignoredDirectories = new Set(['node_modules', '.git', 'dist', 'coverage', '.terraform']);

function checkInstruction(directory: string, root: string, isRoot: boolean): string[] {
  const file = join(directory, 'AGENTS.md');
  const label = relative(root, file) || 'AGENTS.md';
  if (!existsSync(file)) return [`Missing ${label}`];

  const content = readFileSync(file, 'utf8');
  const issues: string[] = [];
  if (!content.startsWith('# ')) issues.push(`Invalid heading in ${label}`);

  if (isRoot) {
    if (!content.includes('## Work rules (10)')) {
      issues.push(`Missing work contract in ${label}`);
    }
  } else {
    for (const heading of ['## Scope', '## Local rules', '## Validation']) {
      if (!content.includes(heading)) issues.push(`Missing ${heading} in ${label}`);
    }
    if (content.length > 2500) issues.push(`Nested instructions too large: ${label}`);
  }
  return issues;
}

/**
 * Audits only the known, source-controlled governance roots.
 * This traversal is intentionally scoped: no arbitrary project-wide source scan.
 */
export function checkAgentCoverage(projectRoot: string): string[] {
  const root = resolve(projectRoot);
  const issues = checkInstruction(root, root, true);
  for (const scope of governanceRoots) {
    const directory = join(root, scope);
    if (!existsSync(directory)) continue;

    const pending = [directory];
    while (pending.length > 0) {
      const current = pending.pop();
      if (current === undefined) continue;
      issues.push(...checkInstruction(current, root, false));
      const entries = readdirSync(current, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory() || ignoredDirectories.has(entry.name)) continue;
        pending.push(join(current, entry.name));
      }
    }
  }
  return issues;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const issues = checkAgentCoverage(process.cwd());
  if (issues.length > 0) {
    console.error(issues.join('\n'));
    process.exitCode = 1;
  } else {
    console.info('Nested AGENTS coverage and structural checks passed.');
  }
}
