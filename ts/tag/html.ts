import { InputElementTargetEvent } from '../interpolations/ElementTargetEvent.interface.js'
import { LikeObjectChildren, ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { RegularValue } from '../subject.types.js'
import { StringTag, DomTag } from './Tag.class.js'

export type TagValues = (((e: InputElementTargetEvent) => any) | RegularValue | null | undefined | Object)[]

export function html(
  strings: string[] | TemplateStringsArray,
  ...values: TagValues
) {
  return new StringTag(strings as string[], values)
}

html.dom = function(
  dom: LikeObjectChildren,
  ...values: TagValues
) {
  return new DomTag(dom as ObjectChildren, values)
}
