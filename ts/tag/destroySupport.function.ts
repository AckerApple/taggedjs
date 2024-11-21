import { getChildTagsToDestroy } from './getChildTagsToDestroy.function.js'
import { smartRemoveKids } from './smartRemoveKids.function.js'
import {SupportTagGlobal } from './TemplaterResult.class.js'
import { runBeforeDestroy } from './tagRunner.js'
import { AnySupport } from './Support.class.js'
import { Context } from './Context.types.js'

export function destroySupport(
  support: AnySupport,
): void | Promise<void> {
  const global = support.subject.global as SupportTagGlobal
  global.deleted = true
  support.subject.renderCount = 0 // if it comes back, wont be considered an update
  const promises: Promise<any>[] = []

  const context = global.context as Context
  getChildTagsToDestroy(context, promises)

  if(global.destroy$) {
    global.destroy$.next()
    runBeforeDestroy(support)
  }
  
  if(promises.length) {
    return Promise.all(promises).then(() => smartRemoveKids(support))
  }

  smartRemoveKids(support)
}
