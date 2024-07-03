import { Support } from './Support.class.js'

export type DestroyOptions = {
  stagger: number
  byParent?: boolean // who's destroying me? if byParent, ignore possible animations
}

export function getChildTagsToDestroy(
  childTags: Support[],
  allTags: Support[] = [],
): Support[] {
  for (const cTag of childTags) {
    allTags.push(cTag)
    const subTags = cTag.subject.global.childTags
    getChildTagsToDestroy(subTags, allTags)
  }

  return allTags
}
