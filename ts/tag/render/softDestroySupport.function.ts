import { getChildTagsToSoftDestroy } from '../destroyContext.function.js'
import { SupportTagGlobal } from '../getTemplaterResult.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { getNewGlobal } from '../update/getNewGlobal.function.js'
import { smartRemoveKids } from '../smartRemoveKids.function.js'
import { ContextItem } from '../Context.types.js'

/** used when a tag swaps content returned */
export function softDestroySupport(
  lastSupport: AnySupport,
) {
  const subject = lastSupport.subject
  const global = subject.global as SupportTagGlobal
  const {subs, tags} = getChildTagsToSoftDestroy(global.context as ContextItem[])

  softDestroyOne(global)
  for (const child of tags) {
    const cGlobal = child.subject.global
    if(cGlobal.deleted === true) {
      return
    }
    softDestroyOne( cGlobal )
  }
  
  const mySubs = global.subscriptions
  if(mySubs) {
    subs.forEach(sub => sub.unsubscribe())
  }

  getNewGlobal(subject)
}

function softDestroyOne(
  global: SupportTagGlobal
) {
  global.deleted = true // the children are truly destroyed but the main support will be swapped
  smartRemoveKids(global, [])
}
