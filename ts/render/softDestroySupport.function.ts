import { getChildTagsToSoftDestroy, unsubscribeFrom } from '../tag/destroyContext.function.js'
import { SupportTagGlobal } from '../tag/getTemplaterResult.function.js'
import { AnySupport } from '../tag/AnySupport.type.js'
import { getNewGlobal } from '../tag/update/getNewGlobal.function.js'
import { smartRemoveKids } from '../tag/smartRemoveKids.function.js'

/** used when a tag swaps content returned */
export function softDestroySupport(
  lastSupport: AnySupport,
) {
  const subject = lastSupport.context
  const global = subject.global as SupportTagGlobal
  const {subs, tags} = getChildTagsToSoftDestroy(global.contexts)

  softDestroyOne(global)
  for (const child of tags) {
    const cGlobal = child.context.global
    if(cGlobal.deleted === true) {
      return
    }
    softDestroyOne( cGlobal )
  }
  
  const mySubs = global.subscriptions
  if(mySubs) {
    subs.forEach(unsubscribeFrom)
  }

  getNewGlobal(subject)
}

function softDestroyOne(
  global: SupportTagGlobal
) {
  global.deleted = true // the children are truly destroyed but the main support will be swapped
  smartRemoveKids(global, [])
}
