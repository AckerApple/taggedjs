import { Support } from './Support.class.js'

export type DestroyOptions = {
  stagger: number
  byParent?: boolean // who's destroying me? if byParent, ignore possible animations
}

export function getChildTagsToDestroy(
  childTags: Support[],
  allTags: Support[] = [],
): Support[] {
  for (let index = childTags.length - 1; index >= 0; --index) {
    const cTag = childTags[index]
    allTags.push(cTag)
    const subTags = cTag.subject.global.childTags
    getChildTagsToDestroy(subTags, allTags)
  }

  return allTags
}
