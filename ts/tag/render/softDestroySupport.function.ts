import { AnySupport, BaseSupport, Support, destroySubs } from '../Support.class.js'
import { Context } from '../Tag.class.js'
import { SupportTagGlobal } from '../TemplaterResult.class.js'
import { getChildTagsToSoftDestroy } from '../destroy.support.js'
import { smartRemoveKids } from '../smartRemoveKids.function.js'
import { getNewGlobal } from '../update/getNewGlobal.function.js'

/** used when a tag swaps content returned */
export function softDestroySupport(
  lastSupport: BaseSupport | Support,
) {
  const global = lastSupport.subject.global as SupportTagGlobal
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

  lastSupport.subject.global = getNewGlobal()
  lastSupport.subject.global.placeholder = global.placeholder
  lastSupport.subject.global.lastValueType = global.nowValueType
}

function softDestroyOne(
  child: AnySupport
) {
  const global = child.subject.global
  if(global.deleted) {
    return
  }

  smartRemoveKids(child, [], 0)
  global.deleted = true // the children are truly destroyed but the main support will be swapped
}
