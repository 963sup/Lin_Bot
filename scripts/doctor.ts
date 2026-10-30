import { execFileSync } from 'node:child_process';

const majorVersion = Number(process.versions.node.split('.')[0]);
if (!Number.isInteger(majorVersion) || majorVersion < 22) {
  console.error('Node.js 22 or later is required.');
  process.exitCode = 1;
} else {
  console.info(`Node.js: ${process.version}`);
}

try {
  const pnpmVersion = execFileSync('pnpm', ['--version'], { encoding: 'utf8' }).trim();
  console.info(`pnpm: ${pnpmVersion}`);
} catch {
  console.error('pnpm is unavailable. Enable Corepack or install pnpm.');
  process.exitCode = 1;
}
