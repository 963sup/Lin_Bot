import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';

import ts from 'typescript';

const modulesRoot = resolve('src/modules');
const violations: string[] = [];

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : path.endsWith('.ts') ? [path] : [];
  });
}

if (existsSync(modulesRoot)) {
  for (const file of walk(modulesRoot)) {
    const parts = relative(modulesRoot, file).split(sep);
    if (parts[1] !== 'domain') continue;

    const domainRoot = join(modulesRoot, parts[0] ?? '', 'domain');
    const source = ts.createSourceFile(
      file,
      readFileSync(file, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
    );

    for (const statement of source.statements) {
      if (!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) continue;
      const specifier = statement.moduleSpecifier;
      if (!specifier || !ts.isStringLiteral(specifier)) continue;

      const target = specifier.text;
      if (!target.startsWith('.')) {
        violations.push(`${relative('.', file)} imports external package "${target}"`);
        continue;
      }

      const resolved = resolve(dirname(file), target);
      if (resolved !== domainRoot && !resolved.startsWith(domainRoot + sep)) {
        violations.push(`${relative('.', file)} imports outside its domain: "${target}"`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error(violations.join('\n'));
  process.exitCode = 1;
} else {
  console.info('Domain import boundary check passed.');
}
