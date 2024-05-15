import { InputElementTargetEvent } from "../interpolations/ElementTargetEvent.interface"
import { Tag } from "./Tag.class"

export type TagValues = (((e: InputElementTargetEvent) => any) | number | string | boolean | null | undefined | Object)[]

export function html(
  strings: string[] | TemplateStringsArray,
  ...values: TagValues
) {
  return new Tag(strings as string[], values)
}
