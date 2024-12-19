import { getChildTagsToDestroy } from './getChildTagsToDestroy.function.js'
import { smartRemoveKids } from './smartRemoveKids.function.js'
import {SupportTagGlobal } from './getTemplaterResult.function.js'
import { runBeforeDestroy } from './tagRunner.js'
import { AnySupport } from './getSupport.function.js'
import { Context } from './Context.types.js'

export function destroySupport(
  support: AnySupport,
): Promise<void>[] {
  const global = support.subject.global as SupportTagGlobal
  global.deleted = true
  support.subject.renderCount = 0 // if it comes back, wont be considered an update
  const promises: Promise<any>[] = []

  const context = global.context as Context
  getChildTagsToDestroy(context)

  if(global.destroy$) {
    runBeforeDestroy(support)
  }

  smartRemoveKids(support, promises)

  return promises
}
