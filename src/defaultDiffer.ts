import { ListDiffer } from "./types"
import { isEqual } from "lodash-es"

export const defaultDiffer: ListDiffer<any> = (oldState, newState) =>
  !isEqual(oldState, newState)

/**

 "source": "src/foo.js",          // your source code
 "main": "dist/foo.js",           // where to generate the CommonJS/Node bundle
 "exports": "dist/foo.modern.js", // path to the modern output (see below)
 "module": "dist/foo.module.js",  // where to generate the ESM bundle
 "unpkg": "dist/foo.umd.js",      // where to generate the UMD bundle (also aliased as "umd:main")


 "main": "dist/foo.js",            // CommonJS bundle
 "umd:main": "dist/foo.umd.js",    // UMD bundle
 "module": "dist/foo.m.js",        // ES Modules bundle
 "esmodule": "dist/foo.modern.js", // Modern bundle
 "types": "dist/foo.d.ts"          // TypeScript typings directory


 https://github.com/developit/microbundle

 **/
