import { destroyContext } from '../tag/destroyContext.function.js'
import { smartRemoveKids } from '../tag/smartRemoveKids.function.js'
import { SupportTagGlobal } from '../tag/getTemplaterResult.function.js'
import { runBeforeDestroy } from '../tag/tagRunner.js'
import { AnySupport } from '../tag/AnySupport.type.js'

export function destroySupport(
  support: AnySupport,
  global: SupportTagGlobal,
): Promise<void>[] {
  const subject = support.context

  global.deleted = true
  subject.renderCount = 0 // if it comes back, wont be considered an update
  const promises: Promise<any>[] = []

  const context = global.contexts
  destroyContext(context, support)

  if(global.destroy$) {
    runBeforeDestroy(support, global)
  }

  smartRemoveKids(global, promises)

  return promises
}
