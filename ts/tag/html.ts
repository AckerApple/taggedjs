import { TagJsEvent } from '../TagJsEvent.type.js'
import { LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { getDomTag } from './getDomTag.function.js'
import { PropWatches } from '../tagJsVars/tag.function.js'
import { getTemplaterResult } from './getTemplaterResult.function.js'
import { RegularValue } from './update/processRegularValue.function.js'
import { Tag } from './Tag.type.js'
import { getStringTag } from './processOuterDomTagInit.function.js'

export type InputCallback = ((e: TagJsEvent) => unknown)
/** represents a single value within html`<div>${value}</div>`. The data typing of "& unknown" is to allow anything AND STILL infer functions have one argument if "e"  */
export type TagValue = (InputCallback | RegularValue | object) & unknown
export type TagValues = TagValue[]

/** Used as html`<div></div>` */
export function html(
  strings: string[] | TemplateStringsArray,
  ...values: TagValues
): Tag {
  const stringTag = getStringTag(strings as string[], values)
  const templater = getTemplaterResult(PropWatches.NONE)
  templater.tag = stringTag
  stringTag.templater = templater
  return stringTag
}

html.dom = function(
  dom: LikeObjectChildren,
  ...values: TagValues
) {
  return getDomTag(dom, values)
}
