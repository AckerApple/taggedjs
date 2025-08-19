import { destroyContexts } from '../tag/destroyContexts.function.js'
import { smartRemoveKids } from '../tag/smartRemoveKids.function.js'
import { SupportTagGlobal } from '../tag/getTemplaterResult.function.js'
import { runBeforeDestroy } from '../tag/tagRunner.js'
import { AnySupport } from '../tag/index.js'
import { ContextItem } from '../index.js'

export function destroySupport(
  support: AnySupport,
  global: SupportTagGlobal,
): Promise<void>[] {
  const context = support.context

  global.deleted = true
  context.renderCount = 0 // if it comes back, wont be considered an update
  const promises: Promise<any>[] = []

  const subContexts = context.contexts
  destroyContexts(subContexts, support)

  // tag() only destroy
  if( support.templater.wrapper ) {
    runBeforeDestroy(support, global)
  }

  smartRemoveKids(context, promises)

  delete (context as ContextItem).state
  delete (context as ContextItem).contexts

  return promises
}
