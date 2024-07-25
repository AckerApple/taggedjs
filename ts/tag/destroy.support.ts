import { isTagComponent } from '../isInstance.js'
import { Subscription } from '../subject/subject.utils.js'
import { Support } from './Support.class.js'
import { Context } from './Tag.class.js'
import { runBeforeDestroy } from './tagRunner.js'

export function getChildTagsToDestroy(
  childTags: Context,
  subs: Subscription<any>[] = [],
): Subscription<any>[] {
  for (const child of childTags) {    
    const support = child.global.newest as Support
    if(!support) {
      continue
    }

    const global = support.subject.global
    const iSubs = global.subscriptions
    if(iSubs) {
      subs.push(...iSubs)
    }

    if(isTagComponent(support.templater)) {
      runBeforeDestroy(support, support)
    }

    const subTags = global.context as Context
    getChildTagsToDestroy(subTags, subs)
  }

  return subs
}

export function getChildTagsToSoftDestroy(
  childTags: Context,
  tags: Support[] = [],
  subs: Subscription<any>[] = []
): {subs: Subscription<any>[], tags: Support[]} {
  for (const child of childTags) {

    const global = child.global
    const support = child.global.newest as Support
    if(support) {
      tags.push(support)
      const iSubs = global.subscriptions
      if(iSubs) {
        subs.push(...iSubs)
      }
    }

    const subTags = global.context as Context
    if(subTags) {
      getChildTagsToSoftDestroy(subTags, tags, subs)
    }
  }

  return {tags, subs}
}
