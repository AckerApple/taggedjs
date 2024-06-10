import { BaseSupport, Support, resetSupport } from '../Support.class.js'
import { DestroyOptions, getChildTagsToDestroy } from '../destroy.support.js'

/** used when a tag swaps content returned */
export function softDestroySupport(
  lastSupport: BaseSupport | Support,
  options: DestroyOptions = {byParent: false, stagger: 0},
) {
  const global = lastSupport.subject.global
  global.deleted = true
  global.context = {}
  const childTags = getChildTagsToDestroy(global.childTags)

  lastSupport.destroySubscriptions()

  childTags.forEach(child => {
    const subGlobal = child.subject.global
    delete subGlobal.newest
    subGlobal.deleted = true
  })

  resetSupport(lastSupport)
  lastSupport.destroyClones()
  childTags.forEach(child => softDestroySupport(child, {byParent: true, stagger: 0}))
}
