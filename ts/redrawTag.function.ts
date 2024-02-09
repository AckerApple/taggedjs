import { getTagSupport } from "./getTagSupport.js"
import { TemplaterResult } from "./templater.utils.js"
import { Tag } from "./Tag.class.js"

export function redrawTag(
  existingTag: Tag | undefined,
  templater: TemplaterResult, // latest tag function to call for rendering
  ownerTag?: Tag,
) {
  const depth = ownerTag?.tagSupport.depth || 0
  const tagSupport = existingTag?.tagSupport || getTagSupport(depth, templater)

  const result = templater.renderWithSupport(
    tagSupport,
    existingTag,
    ownerTag,
  )

  return result
}
