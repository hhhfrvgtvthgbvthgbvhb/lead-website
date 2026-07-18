// Preload shim: payload's ESM loadEnv does `import nextEnvImport from '@next/env'`.
// When tsx compiles that file through its CJS pipeline the default interop is lost
// (`import_env.default` is undefined). Giving the CJS exports a self-referencing
// `default` property makes both interop styles work.
const Module = require('module')
const origRequire = Module.prototype.require
Module.prototype.require = function (id) {
  const mod = origRequire.apply(this, arguments)
  if (id === '@next/env' && mod && typeof mod === 'object' && !('default' in mod)) {
    try {
      mod.default = mod
    } catch {
      // frozen exports — ignore
    }
  }
  return mod
}
