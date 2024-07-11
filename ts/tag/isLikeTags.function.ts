import { StringTag, DomTag } from './Tag.class.js'
import { BaseSupport, Support } from './Support.class.js'
import { TemplaterResult } from './TemplaterResult.class.js'

export function isLikeTags(
  support0: BaseSupport | Support | StringTag, // new
  support1: Support | BaseSupport, // previous
): boolean {
  const templater0 = support0.templater as TemplaterResult | undefined
  const templater1 = support1.templater as TemplaterResult

  const tag0 = templater0?.tag || (support0 as StringTag | DomTag)
  const tag1 = templater1.tag as StringTag | DomTag
 
  return isLikeDomTags(
    tag0 as DomTag,
    tag1 as DomTag,
  )
}

export function isLikeDomTags(
  tag0: DomTag,
  tag1: DomTag,
) {
  const domMeta0 = tag0.dom
  const domMeta1 = tag1.dom
  return domMeta0 === domMeta1
}
