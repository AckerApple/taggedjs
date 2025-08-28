import { SupportTagGlobal } from './getTemplaterResult.function.js'
import { Subscription } from '../subject/subject.utils.js'
import { isTagComponent } from '../isInstance.js'
import { runBeforeDestroy } from './tagRunner.js'
import { AnySupport } from './index.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { ContextItem, SupportContextItem } from '../index.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'

export function destroyContexts(
  childTags: ContextItem[],
  ownerSupport: AnySupport,
) {
  for (const child of childTags) {
    // deleting arrays
    const lastArray = child.lastArray
    if(lastArray) {
      // recurse
      destroyContexts(lastArray, ownerSupport)
      continue
    }

    const childValue = child.value as TagJsVar | undefined
    if(childValue?.tagJsType === ValueTypes.subscribe) {
      childValue.destroy(child, ownerSupport)
      child.deleted = true
      continue
    }

    const global = child.global as SupportTagGlobal
    if(!global) {
      continue // not a support contextItem
    }

    const support = (child as SupportContextItem).state.newest as AnySupport
    const iSubs = global.subscriptions
    if(iSubs) {
      iSubs.forEach(unsubscribeFrom)
    }

    if(isTagComponent(support.templater)) {
      runBeforeDestroy(support, global)
    }

    const subTags = child.contexts as ContextItem[]
    // recurse
    destroyContexts(subTags, support)

    global.deleted = true
  }
}

export function getChildTagsToSoftDestroy(
  childTags: ContextItem[],
  tags: AnySupport[] = [],
  subs: Subscription<any>[] = []
): {subs: Subscription<any>[], tags: AnySupport[]} {
  for (const child of childTags as SupportContextItem[]) {
    const global = child.global as SupportTagGlobal

    if(!global) {
      continue
    }

    const support = child.state.newest
    if(support) {
      tags.push(support)
      const iSubs = global.subscriptions
      if(iSubs) {
        subs.push(...iSubs)
      }
    }

    const subTags = child.contexts
    if(subTags) {
      getChildTagsToSoftDestroy(subTags, tags, subs)
    }
  }

  return {tags, subs}
}

export function unsubscribeFrom(from: any) {
  from.unsubscribe()
}