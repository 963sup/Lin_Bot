import { execFileSync } from 'node:child_process';

const [majorVersion = 0, minorVersion = 0] = process.versions.node.split('.').map(Number);
if (!((majorVersion === 22 && minorVersion >= 12) || majorVersion === 24 || majorVersion >= 26)) {
  console.error('Use Node.js 22.12+, 24.x, or 26+ as declared in package.json.');
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
