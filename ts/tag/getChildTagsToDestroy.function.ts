import {SupportTagGlobal } from './TemplaterResult.class.js'
import { Subscription } from '../subject/subject.utils.js'
import { isTagComponent } from '../isInstance.js'
import { runBeforeDestroy } from './tagRunner.js'
import { AnySupport } from './Support.class.js'
import { Context } from './Context.types.js'

export function getChildTagsToDestroy(
  childTags: Context,
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

    const subTags = global.context as Context
    getChildTagsToDestroy(subTags)
  }
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
