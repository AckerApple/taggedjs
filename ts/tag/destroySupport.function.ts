import { destroyContext } from './destroyContext.function.js'
import { smartRemoveKids } from './smartRemoveKids.function.js'
import { SupportTagGlobal } from './getTemplaterResult.function.js'
import { runBeforeDestroy } from './tagRunner.js'
import { AnySupport } from './AnySupport.type.js'
import { ContextItem } from './Context.types.js'

export function destroySupport(
  support: AnySupport,
  global: SupportTagGlobal,
): Promise<void>[] {
  const subject = support.subject

  global.deleted = true
  subject.renderCount = 0 // if it comes back, wont be considered an update
  const promises: Promise<any>[] = []

  const context = global.context as ContextItem[]
  destroyContext(context)

  if(global.destroy$) {
    runBeforeDestroy(support, global)
  }

  smartRemoveKids(global, promises)

  return promises
}
