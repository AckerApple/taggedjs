import { SupportTagGlobal } from './getTemplaterResult.function.js'
import { Subscription } from '../subject/subject.utils.js'
import { isTagComponent } from '../isInstance.js'
import { runBeforeDestroy } from './tagRunner.js'
import { AnySupport } from './getSupport.function.js'
import { ContextItem } from './Context.types.js'

export function getChildTagsToDestroy(
  childTags: ContextItem[],
) {
  for (const child of childTags) {
    const lastArray = child.lastArray
    if(lastArray) {
      getChildTagsToDestroy(lastArray)
      continue
    }

    const global = child.global as SupportTagGlobal
    if(!global) {
      continue // not a support contextItem
    }

    const support = global.newest
    const iSubs = global.subscriptions
    if(iSubs) {
      iSubs.forEach(iSub => iSub.unsubscribe())
    }

    if(isTagComponent(support.templater)) {
      runBeforeDestroy(support)
    }

    const subTags = global.context as ContextItem[]
    getChildTagsToDestroy(subTags)
  }
}

export function getChildTagsToSoftDestroy(
  childTags: ContextItem[],
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

    const subTags = global.context as ContextItem[]
    if(subTags) {
      getChildTagsToSoftDestroy(subTags, tags, subs)
    }
  }

  return {tags, subs}
}
