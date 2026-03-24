import { createHtmlSupport } from '../../tag/createHtmlSupport.function.js'
import { TemplaterResult } from '../../tag/getTemplaterResult.function.js'
import { checkTagValueChangeAndUpdate } from '../../tag/checkTagValueChange.function.js'
import type { StringTag } from '../../tag/StringTag.type.js'
import type { DomTag } from '../../tag/DomTag.type.js'
import { ValueTypes } from '../../tag/ValueTypes.enum.js'
import { ContextItem } from '../../tag/ContextItem.type.js'
import { AnySupport } from '../../tag/index.js'
import { blankHandler } from '../dom/blankHandler.function.js'

export function tagFakeTemplater(
  tag: StringTag | DomTag
) {
  const templater = getFakeTemplater() as any
  templater.tag = tag
  tag.templater = templater

  return templater
}

export function getFakeTemplater() {
}
