import { runBeforeDestroy } from './tagRunner.js'
import { getChildTagsToDestroy } from './destroy.support.js'
import { AnySupport, destroySubs, Support } from './Support.class.js'
import { smartRemoveKids } from './smartRemoveKids.function.js'
import { Context } from './Tag.class.js'

export function destroySupport(
  support: AnySupport,
  stagger: number,
): number | Promise<number> {
  const global = support.subject.global
  const subs = getChildTagsToDestroy(global.context as Context)

  /*
  const ownerSupport = (support as unknown as Support).ownerSupport
  if(ownerSupport) {
    const ownGlobal = ownerSupport.subject.global
    // remove myself from parent
    ownGlobal.childTags = ownGlobal.childTags.filter(
      child => child.subject.global !== support.subject.global
    )
  }
  */

  global.destroy$.next()
  runBeforeDestroy(support, support)

  const mySubs = support.subject.global.subscriptions
  if(mySubs) {
    subs.push(...mySubs)
  }
  
  // destroy all child and possibly my own subscriptions
  destroySubs(subs)

  // first paint
  const promises: Promise<any>[] = []
  stagger = smartRemoveKids(support, promises, stagger)
  
  if(promises.length) {
    return Promise.all(promises).then(() => stagger)
  }
  return stagger
}