import path from 'path'
import type { Plugin, ViteDevServer } from 'vite'

export type VirtualModule = string | object | (() => string | object)

export interface VirtualModules {
  [id: string]: VirtualModule
}

const pluginsMethods = new WeakMap()

const VIRTUAL_PREFIX = '/@virtual:vite-plugin-virtual/'

export function invalidateVirtualModule(server: ViteDevServer, id: string): void {
  const { moduleGraph, ws } = server
  const module = moduleGraph.getModuleById(VIRTUAL_PREFIX + id)
  if (module) {
    moduleGraph.invalidateModule(module)
    if (ws) {
      ws.send({
        type: 'full-reload',
        path: '*'
      })
    }
  }
}

export function updateVirtualModule(plugin: Plugin, id: string, value: VirtualModule): void {
  const methods = pluginsMethods.get(plugin)
  if (methods) {
    methods.update(id, value)
  }
}

function virtual(modules: VirtualModules = {}): Plugin {
  const resolvedIds = new Map<string, string>()

  Object.keys(modules).forEach((id) => {
    resolvedIds.set(path.resolve(id), id)
  })

  let server: ViteDevServer

  const plugin = {
    name: 'vite-plugin-virtual',
    enforce: 'pre',
    configureServer(_server: ViteDevServer) {
      server = _server
    },
    resolveId(id: string, importer: string) {
      if (id in modules)
        return VIRTUAL_PREFIX + id

      if (importer) {
        const importerNoPrefix = importer.startsWith(VIRTUAL_PREFIX)
          ? importer.slice(VIRTUAL_PREFIX.length)
          : importer
        const resolved = path.resolve(path.dirname(importerNoPrefix), id)
        if (resolvedIds.has(resolved))
          return VIRTUAL_PREFIX + resolved
      }
      return null
    },
    load(id: string) {
      if (id.startsWith(VIRTUAL_PREFIX)) {
        const idNoPrefix = id.slice(VIRTUAL_PREFIX.length)
        const resolvedId = idNoPrefix in modules ? idNoPrefix : resolvedIds.get(idNoPrefix)
        if (resolvedId) {
          let module = modules[resolvedId]
          module = typeof module === 'function' ? module() : module
          return typeof module === 'string' ? module : `export default ${JSON.stringify(module)}`
        }
      }
      return null
    },
  }
  pluginsMethods.set(plugin, {
    update(id: string, value: VirtualModule) {
      modules[id] = value
      invalidateVirtualModule(server, id)
    }
  })
  return plugin as Plugin
}

export default virtual