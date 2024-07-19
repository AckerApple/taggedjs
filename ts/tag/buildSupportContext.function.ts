import { AnySupport } from './Support.class.js'
import { Context, DomTag, StringTag } from './Tag.class.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'

export function buildSupportContext(support: AnySupport) {
  const context = support.subject.global.context
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values // this.values || thisTag.values

  let index = 0
  const len = values.length
  while (index < len) {
    buildContext(
      values,
      index,
      context,
    )

    ++index
  }

  return context
}

function buildContext(
  values: unknown[],
  index: number,
  context: Context,
) {
  const value = values[index] as any

  // 🆕 First time values below
  context[index] = {
    value,
    global: getNewGlobal(),
  }
}
