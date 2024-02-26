import { TagSupport } from "./TagSupport.class.js"
import { TemplaterResult } from "./templater.utils.js"
import { Tag } from "./Tag.class.js"

export function redrawTag(
  tagSupport: TagSupport,
  templater: TemplaterResult, // latest tag function to call for rendering
  existingTag?: Tag,
  ownerTag?: Tag,
) {
  const result = templater.renderWithSupport(
    tagSupport,
    existingTag,
    ownerTag,
  )

  return result
}
