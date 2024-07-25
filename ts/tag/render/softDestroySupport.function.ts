import { AnySupport, BaseSupport, Support, destroySubs } from '../Support.class.js'
import { Context } from '../Tag.class.js'
import { getChildTagsToSoftDestroy } from '../destroy.support.js'
import { smartRemoveKids } from '../smartRemoveKids.function.js'
import { getNewGlobal } from '../update/getNewGlobal.function.js'

/** used when a tag swaps content returned */
export function softDestroySupport(
  lastSupport: BaseSupport | Support,
) {
  const global = lastSupport.subject.global
  const mySubs = global.subscriptions
  const {subs, tags} = getChildTagsToSoftDestroy(global.context as Context)

  for (const child of tags) {
    softDestroyOne(child)
  }
  softDestroyOne(lastSupport)
  
  if(mySubs) {
    subs.push(...mySubs)
    destroySubs(subs)
  }

  global.deleted = true

  lastSupport.subject.global = getNewGlobal()
  lastSupport.subject.global.placeholder = global.placeholder
}

function softDestroyOne(
  child: AnySupport
) {
  const subGlobal = child.subject.global
  if(subGlobal.deleted) {
    return
  }

  smartRemoveKids(child, [], 0)
  subGlobal.deleted = true // the children are truly destroyed but the main support will be swapped
}
