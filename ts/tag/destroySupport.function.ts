import { runBeforeDestroy } from './tagRunner.js'
import { DestroyOptions, getChildTagsToDestroy } from './destroy.support.js'
import { AnySupport, destroySubs, resetSupport, Support } from './Support.class.js'
import { isTagComponent } from '../isInstance.js'
import { smartRemoveKids } from './smartRemoveKids.function.js'

export function destroySupport(
  support: AnySupport,
  options: DestroyOptions = {
    stagger: 0,
  }
): number | Promise<number> {
  const global = support.subject.global
  const {tags, subs} = options.byParent ? {subs:[], tags:[]} : getChildTagsToDestroy(global.childTags) // .toReversed()

  if(!options.byParent) {
    const ownerSupport = (support as unknown as Support).ownerSupport
    if(ownerSupport) {
      ownerSupport.subject.global.childTags = ownerSupport.subject.global.childTags.filter(
        child => child.subject.global !== support.subject.global
      )
    }
  }

  if(isTagComponent(support.templater)) {
    global.destroy$.next()
    runBeforeDestroy(support, support)
  }

  const mySubs = support.subject.global.subscriptions
  if(mySubs) {
    subs.push(...mySubs)
  }
  destroySubs(subs)

  // signify immediately child has been deleted (looked for during event processing)
  let index = tags.length
  while (index--) {
    const child = tags[index]
    if(isTagComponent(child.templater)) {
      runBeforeDestroy(child, child)
    }
  }
  
  resetSupport(
    support as Support,
    global.context.length, // don't clear context just yet for smart remove kids uses context
  )

  // first paint
  const promises: Promise<any>[] = []
  options.stagger = smartRemoveKids(support, promises, options)
  global.context = []
  
  if(promises.length) {
    return Promise.all(promises).then(() => options.stagger)
  }
  return options.stagger
}
