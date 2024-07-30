import { isTagComponent } from '../isInstance.js'
import { Subscription } from '../subject/subject.utils.js'
import { AnySupport } from './Support.class.js'
import { Context } from './Tag.class.js'
import { runBeforeDestroy } from './tagRunner.js'
import { SupportTagGlobal } from './TemplaterResult.class.js'

export function getChildTagsToDestroy(
  childTags: Context,
  subs: Subscription<any>[] = [],
): Subscription<any>[] {
  for (const child of childTags) {    
    const global = child.global as SupportTagGlobal
    
    if(!global) {
      continue // not a support contextItem
    }

    const support = global.newest
    if(!support) {
      continue // not a support contextItem
    }

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
  tags: AnySupport[] = [],
  subs: Subscription<any>[] = []
): {subs: Subscription<any>[], tags: AnySupport[]} {
  for (const child of childTags) {
    const global = child.global as SupportTagGlobal

    if(!global) {
      continue
    }

    const support = global.newest
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
