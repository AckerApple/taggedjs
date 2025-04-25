import { getChildTagsToSoftDestroy } from '../getChildTagsToDestroy.function.js'
import {SupportTagGlobal, TagGlobal } from '../getTemplaterResult.function.js'
import { AnySupport } from '../getSupport.function.js'
import { getNewGlobal } from '../update/getNewGlobal.function.js'
import { smartRemoveKids } from '../smartRemoveKids.function.js'
import { ContextItem } from '../Context.types.js'

/** used when a tag swaps content returned */
export function softDestroySupport(
  lastSupport: AnySupport,
) {
  const global = lastSupport.subject.global as SupportTagGlobal
  const {subs, tags} = getChildTagsToSoftDestroy(global.context as ContextItem[])

  softDestroyOne(lastSupport)
  for (const child of tags) {
    softDestroyOne(child)
  }
  
  const mySubs = global.subscriptions
  if(mySubs) {
    subs.forEach(sub => sub.unsubscribe())
  }

  getNewGlobal(lastSupport.subject)
}

function softDestroyOne(
  child: AnySupport
) {
  const subject = child.subject
  const global = subject.global

  if(global.deleted === true) {
    return
  }

  global.deleted = true // the children are truly destroyed but the main support will be swapped
  subject.renderCount = 0 // TODO: most likely can be removed
  smartRemoveKids(global, [])
}
