import type { ViteHotContext } from 'vite/types/hot'
import type { EncodedSourceMap } from '@jridgewell/trace-mapping'
import type { ModuleCacheMap, ViteNodeRunner } from './client'

export type Nullable<T> = T | null | undefined
export type Arrayable<T> = T | Array<T>
export type Awaitable<T> = T | PromiseLike<T>

export interface DepsHandlingOptions {
  external?: (string | RegExp)[]
  inline?: (string | RegExp)[] | true
  cacheDir?: string
  /**
   * Try to guess the CJS version of a package when it's invalid ESM
   * @default false
   */
  fallbackCJS?: boolean
}

export interface StartOfSourceMap {
  file?: string
  sourceRoot?: string
}

export type { EncodedSourceMap, DecodedSourceMap } from '@jridgewell/trace-mapping'

export interface RawSourceMap extends StartOfSourceMap {
  version: string
  sources: string[]
  names: string[]
  sourcesContent?: string[]
  mappings: string
}

export interface FetchResult {
  code?: string
  externalize?: string
  map?: EncodedSourceMap | null
}

export type HotContext = Omit<ViteHotContext, 'acceptDeps' | 'decline'>

export type FetchFunction = (id: string) => Promise<FetchResult>

export type ResolveIdFunction = (id: string, importer?: string) => Awaitable<ViteNodeResolveId | null | undefined | void>

export type CreateHotContextFunction = (runner: ViteNodeRunner, url: string) => HotContext

export interface ModuleCache {
  promise?: Promise<any>
  exports?: any
  evaluated?: boolean
  resolving?: boolean
  code?: string
  map?: EncodedSourceMap
  /**
   * Module ids that imports this module
   */
  importers?: Set<string>
}

export interface ViteNodeRunnerOptions {
  root: string
  fetchModule: FetchFunction
  resolveId?: ResolveIdFunction
  createHotContext?: CreateHotContextFunction
  base?: string
  moduleCache?: ModuleCacheMap
  interopDefault?: boolean
  requestStubs?: Record<string, any>
  debug?: boolean
}

export interface ViteNodeResolveId {
  external?: boolean | 'absolute' | 'relative'
  id: string
  meta?: Record<string, any> | null
  moduleSideEffects?: boolean | 'no-treeshake' | null
  syntheticNamedExports?: boolean | string | null
}

export interface ViteNodeServerOptions {
  /**
   * Inject inline sourcemap to modules
   * @default 'inline'
   */
  sourcemap?: 'inline' | boolean
  /**
   * Deps handling
   */
  deps?: DepsHandlingOptions
  /**
   * Transform method for modules
   */
  transformMode?: {
    ssr?: RegExp[]
    web?: RegExp[]
  }

  debug?: DebuggerOptions
}

export interface DebuggerOptions {
  /**
   * Dump the transformed module to filesystem
   * Passing a string will dump to the specified path
   */
  dumpModules?: boolean | string
  /**
   * Read dumpped module from filesystem whenever exists.
   * Useful for debugging by modifying the dump result from the filesystem.
   */
  loadDumppedModules?: boolean
}

export type { ModuleCacheMap }
