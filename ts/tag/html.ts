import { InputElementTargetEvent } from "../interpolations/ElementTargetEvent.interface"
import { RegularValue } from "../subject.types"
import { Tag } from "./Tag.class"

export type TagValues = (((e: InputElementTargetEvent) => any) | RegularValue | null | undefined | Object)[]

export function html(
  strings: string[] | TemplateStringsArray,
  ...values: TagValues
) {
  return new Tag(strings as string[], values)
}
