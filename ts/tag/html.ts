import { InputElementTargetEvent } from '../interpolations/ElementTargetEvent.interface.js'
import { ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { RegularValue } from '../subject.types.js'
import { Tag, Dom } from './Tag.class.js'

export type TagValues = (((e: InputElementTargetEvent) => any) | RegularValue | null | undefined | Object)[]

export function html(
  strings: string[] | TemplateStringsArray,
  ...values: TagValues
) {
  return new Tag(strings as string[], values)
}

html.dom = function(
  dom: ObjectChildren,
  ...values: TagValues
) {
  return new Dom(dom, values)
}
