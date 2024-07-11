import { Subscription } from '../subject/subject.utils.js'
import { Support } from './Support.class.js'

export type DestroyOptions = {
  stagger: number
  byParent?: boolean // who's destroying me? if byParent, ignore possible animations
}

export function getChildTagsToDestroy(
  childTags: Support[],
  allTags: Support[] = [],
  subs: Subscription<any>[] = []
): {tags:Support[], subs: Subscription<any>[]} {
  for (const cTag of childTags) {
    allTags.push(cTag)
    const iSubs = cTag.subject.global.subscriptions
    subs.push(...iSubs)
    iSubs.length = 0
    const subTags = cTag.subject.global.childTags
    getChildTagsToDestroy(subTags, allTags, subs)
  }

  childTags.length = 0

  return {tags:allTags, subs}
}
