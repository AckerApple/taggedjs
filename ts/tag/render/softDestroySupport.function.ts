import { AnySupport, BaseSupport, Support, midDestroyChildTags, resetSupport } from '../Support.class.js'
import { DestroyOptions, getChildTagsToDestroy } from '../destroy.support.js'

/** used when a tag swaps content returned */
export function softDestroySupport(
  lastSupport: BaseSupport | Support,
  options: DestroyOptions = {byParent: false, stagger: 0},
) {
  const global = lastSupport.subject.global
  const childTags = getChildTagsToDestroy(global.childTags)
  childTags.forEach(child => softDestroyOne(child))
  softDestroyOne(lastSupport)
}

function softDestroyOne(
  child: AnySupport
) {
  child.destroySubscriptions()
  const subGlobal = child.subject.global
  delete subGlobal.newest
  subGlobal.deleted = true // the children are truly destroyed but the main support will be swapped

  const simpleElm = subGlobal.simpleValueElm
  if(simpleElm) {
    const parentNode = simpleElm.parentNode as ParentNode
    parentNode.removeChild(simpleElm)
    delete subGlobal.simpleValueElm
  }
  
  child.smartRemoveKids()
  child.subject.global.htmlDomMeta.length = 0 // tag maybe used for something else
  child.subject.global.childTags.length = 0 // tag maybe used for something else
  resetSupport(child, 0)
}
