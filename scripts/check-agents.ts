import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
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
  'assets',
] as const;

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
 * Audits tracked and non-ignored untracked files within managed roots.
 * Empty untracked directories do not represent repository content.
 */
export function checkAgentCoverage(projectRoot: string): string[] {
  const root = resolve(projectRoot);
  const gitRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
    cwd: root,
    encoding: 'utf8',
  }).trim();
  if (realpathSync(gitRoot) !== realpathSync(root)) {
    throw new Error('AGENTS coverage must run at the repository root.');
  }

  const files = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard', '-z', '--', ...governanceRoots],
    { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
  ).split('\0');
  const directories = new Set<string>();
  for (const file of files) {
    if (!file || !existsSync(join(root, file))) continue;
    let directory = dirname(file);
    while (directory !== '.') {
      directories.add(directory);
      directory = dirname(directory);
    }
  }

  const issues = checkInstruction(root, root, true);
  for (const directory of [...directories].sort()) {
    issues.push(...checkInstruction(join(root, directory), root, false));
  }
  return issues;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const issues = checkAgentCoverage(process.cwd());
    if (issues.length > 0) {
      console.error(issues.join('\n'));
      process.exitCode = 1;
    } else {
      console.info('Nested AGENTS coverage and structural checks passed.');
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unable to inspect Git files.');
    process.exitCode = 1;
  }
}
