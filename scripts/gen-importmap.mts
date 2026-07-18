// Runs payload's generate:importmap with the project's patched tsx runtime
// (the payload CLI itself hits a Windows ESM-resolution bug with ?namespace=).
import { generateImportMap } from '../node_modules/payload/dist/bin/generateImportMap/index.js'
import * as configModule from '../payload.config'
const config: any = (configModule as any).default?.default ?? (configModule as any).default ?? configModule
await generateImportMap(await config)
console.log('importMap generated')
process.exit(0)
