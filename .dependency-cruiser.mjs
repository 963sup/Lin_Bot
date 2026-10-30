/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
    { name: 'no-cycles', severity: 'error', from: {}, to: { circular: true } },
    { name: 'no-unresolved', severity: 'error', from: {}, to: { couldNotResolve: true } },
    {
      name: 'domain-is-contained',
      severity: 'error',
      from: { path: '^src/modules/([^/]+)/domain/', pathNot: '\\.(test|spec)\\.ts$' },
      to: { pathNot: '^src/modules/$1/domain/' },
    },
    {
      name: 'application-depends-on-contracts',
      severity: 'error',
      from: { path: '^src/modules/([^/]+)/application/', pathNot: '\\.(test|spec)\\.ts$' },
      to: {
        pathNot: [
          '^src/modules/$1/(domain|application)/',
          '^src/modules/[^/]+/index\\.ts$',
          '^src/shared/',
        ],
      },
    },
    {
      name: 'no-cross-module-internals',
      severity: 'error',
      from: { path: '^src/modules/([^/]+)/' },
      to: {
        path: '^src/modules/[^/]+/',
        pathNot: ['^src/modules/$1/', '^src/modules/[^/]+/index\\.ts$'],
      },
    },
    {
      name: 'module-api-only-application-contracts',
      severity: 'error',
      from: { path: '^src/modules/([^/]+)/index\\.ts$' },
      to: { pathNot: ['^src/modules/$1/application/', '^src/shared/'] },
    },
    {
      name: 'no-inward-bootstrap-dependency',
      severity: 'error',
      from: { path: '^src/(modules|platform|shared)/' },
      to: { path: '^src/(bootstrap/|entrypoints/|app\\.ts$)' },
    },
    {
      name: 'platform-has-no-business-dependencies',
      severity: 'error',
      from: { path: '^src/platform/' },
      to: { path: '^src/modules/' },
    },
    {
      name: 'shared-is-independent',
      severity: 'error',
      from: { path: '^src/shared/', pathNot: '\\.(test|spec)\\.ts$' },
      to: { path: '^src/', pathNot: '^src/shared/' },
    },
    {
      name: 'production-does-not-import-tests',
      severity: 'error',
      from: { path: '^src/', pathNot: '\\.(test|spec)\\.ts$' },
      to: { path: '(^tests/|\\.(test|spec)\\.ts$)' },
    },
    {
      name: 'production-does-not-import-dev-dependencies',
      severity: 'error',
      from: { path: '^src/', pathNot: '\\.(test|spec)\\.ts$' },
      to: { dependencyTypes: ['npm-dev'] },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
    enhancedResolveOptions: { conditionNames: ['import', 'node', 'default'] },
  },
};
