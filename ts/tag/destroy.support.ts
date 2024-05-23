import { TagSupport } from './TagSupport.class'

export type DestroyOptions = {
  stagger: number
  byParent?: boolean // who's destroying me? if byParent, ignore possible animations
}

export function getChildTagsToDestroy(
  childTags: TagSupport[],
  allTags: TagSupport[] = [],
): TagSupport[] {
  for (let index = childTags.length - 1; index >= 0; --index) {
    const cTag = childTags[index]

    allTags.push(cTag)
    childTags.splice(index, 1)
    getChildTagsToDestroy(cTag.childTags, allTags)
  }

  return allTags
}
