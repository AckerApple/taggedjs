import { AnySupport, BaseSupport, Support, destroySubs, resetSupport } from '../Support.class.js'
import { getChildTagsToDestroy } from '../destroy.support.js'

/** used when a tag swaps content returned */
export function softDestroySupport(
  lastSupport: BaseSupport | Support,
) {
  const global = lastSupport.subject.global
  const {subs, tags} = getChildTagsToDestroy(global.childTags)
  tags.forEach(child => softDestroyOne(child))
  softDestroyOne(lastSupport)
  const mySubs = global.subscriptions
  
  if(mySubs) {
    subs.push(...mySubs)
    global.subscriptions = []
    destroySubs(subs)
  }
}

function softDestroyOne(
  child: AnySupport
) {
  const subGlobal = child.subject.global
  delete subGlobal.newest
  subGlobal.deleted = true // the children are truly destroyed but the main support will be swapped
  child.smartRemoveKids([])
  subGlobal.childTags = [] // tag maybe used for something else
  resetSupport(child, 0)
}
