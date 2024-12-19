import { InputElementTargetEvent } from '../interpolations/attributes/ElementTargetEvent.interface.js'
import { LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { getStringTag, getDomTag } from './getDomTag.function.js'
import { PropWatches } from './tag.js'
import { getTemplaterResult } from './getTemplaterResult.function.js'
import { RegularValue } from './update/processRegularValue.function.js'

export type TagValues = (((e: InputElementTargetEvent) => any) | RegularValue | null | undefined | object)[]

export function html(
  strings: string[] | TemplateStringsArray,
  ...values: TagValues
) {
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
