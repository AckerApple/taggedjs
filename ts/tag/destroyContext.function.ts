import { SupportTagGlobal } from './getTemplaterResult.function.js'
import { Subscription } from '../subject/subject.utils.js'
import { isTagComponent } from '../isInstance.js'
import { runBeforeDestroy } from './tagRunner.js'
import { AnySupport } from './AnySupport.type.js'
import { ContextItem } from './Context.types.js'

export function destroyContext(
  childTags: ContextItem[],
) {
  for (const child of childTags) {
    // deleting arrays
    const lastArray = child.lastArray
    if(lastArray) {
      destroyContext( lastArray )
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
      runBeforeDestroy(support, global)
    }

    const subTags = global.context as ContextItem[]
    destroyContext(subTags)
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
