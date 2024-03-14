import { Tag } from "./Tag.class"

export function html(
  strings: string[] | TemplateStringsArray,
  ...values: unknown[]
) {
  return new Tag(strings as string[], values)
}
