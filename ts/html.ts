import { Tag } from "./Tag.class.js"

export function html(
  strings: string[],
  ...values: unknown[]
) {
  return new Tag(strings, values)
}
