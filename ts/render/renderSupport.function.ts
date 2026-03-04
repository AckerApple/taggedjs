import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { TemplaterResult } from '../tag/getTemplaterResult.function.js'

export function isInlineHtml(templater: TemplaterResult) {
  return ValueTypes.templater === templater.tagJsType
}


