import { Tag } from "./Tag.class.js"

export function html(strings, ...values) {
  return new Tag(strings, values)
}
