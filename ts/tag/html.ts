import { InputElementTargetEvent } from '../interpolations/attributes/ElementTargetEvent.interface.js'
import { LikeObjectChildren } from '../interpolations/optimizers/exchangeParsedForValues.function.js'
import { RegularValue } from '../subject.types.js'
import { StringTag, DomTag } from './Tag.class.js'
import { TemplaterResult } from './TemplaterResult.class.js'

export type TagValues = (((e: InputElementTargetEvent) => any) | RegularValue | null | undefined | Object)[]

export function html(
  strings: string[] | TemplateStringsArray,
  ...values: TagValues
) {
  const stringTag = new StringTag(strings as string[], values)
  const templater = new TemplaterResult([])
  templater.tag = stringTag
  stringTag.templater = templater
  return stringTag
}

html.dom = function(
  dom: LikeObjectChildren,
  ...values: TagValues
) {
  return new DomTag(dom, values)
}
