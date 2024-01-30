import { Tag } from "./Tag.class.js"
import { Clones } from "./Clones.type.js"
import { Counts } from "./interpolateTemplate.js"

export function processTagResult(
  tag: Tag,
  result: any, // used for recording past and current value
  insertBefore: Element, // <template end interpolate />
  {
    index, counts, forceElement,
  }: {
    index?: number
    counts: Counts
    forceElement?: boolean
  }
): Clones {
  // *for
  if(index !== undefined) {
    const existing = result.lastArray[index]

    if(existing?.tag.isLikeTag(tag)) {
      existing.tag.updateByTag(tag)
      return []
    }

    const lastFirstChild = insertBefore // tag.clones[0] // insertBefore.lastFirstChild
    
    const clones = tag.buildBeforeElement(lastFirstChild, {counts, forceElement, depth: tag.tagSupport.depth + 1})
    
    result.lastArray.push({
      tag, index
    })
    
    return clones
  }

  // *if appears we already have seen
  if(result.tag && !forceElement) {
    // are we just updating an if we already had?
    if(result.tag.isLikeTag(tag)) {
      // components
      if(result instanceof Function) {
        const newTag = result(result.tag.tagSupport)
        result.tag.updateByTag(newTag)
        return []
      }

      result.tag.updateByTag(tag)
      
      return [] // no clones created in element already on stage
    }    
  }

  // *if just now appearing to be a Tag
  const before = (insertBefore as any).clone || insertBefore
  const clones = tag.buildBeforeElement(before, {
    counts,
    forceElement,
    depth: tag.tagSupport.depth,
  })
  result.tag = tag // let reprocessing know we saw this previously as an if

  return clones
}
