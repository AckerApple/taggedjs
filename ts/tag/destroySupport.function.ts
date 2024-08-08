import { runBeforeDestroy } from './tagRunner.js'
import { getChildTagsToDestroy } from './destroy.support.js'
import { AnySupport } from './Support.class.js'
import { smartRemoveKids } from './smartRemoveKids.function.js'
import { Context } from './Context.types.js'
import { SupportTagGlobal } from './TemplaterResult.class.js'

export function destroySupport(
  support: AnySupport,
  stagger: number,
): number | Promise<number> {
  const global = support.subject.global as SupportTagGlobal
  global.deleted = true

  const context = global.context as Context
  getChildTagsToDestroy(context)

  if(global.destroy$) {
    global.destroy$.next()
    runBeforeDestroy(support)
  }

  // first paint
  const promises: Promise<any>[] = []
  stagger = smartRemoveKids(support, promises, stagger)
  
  if(promises.length) {
    return Promise.all(promises).then(() => stagger)
  }
  return stagger
}
