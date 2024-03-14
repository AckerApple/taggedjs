import { TagSupport } from './TagSupport.class'
import { TemplaterResult } from './templater.utils'
import { Tag } from './Tag.class'

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
