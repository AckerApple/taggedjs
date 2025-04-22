import { InputElementTargetEvent } from '../interpolations/attributes/ElementTargetEvent.interface.js'
import { LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { getStringTag, getDomTag } from './getDomTag.function.js'
import { PropWatches } from './tag.function.js'
import { getTemplaterResult } from './getTemplaterResult.function.js'
import { RegularValue } from './update/processRegularValue.function.js'
import { Tag } from './Tag.type.js'

type InputCallback = ((e: InputElementTargetEvent) => any)
export type TagValues = (InputCallback | RegularValue | null | unknown | undefined | object)[]

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
