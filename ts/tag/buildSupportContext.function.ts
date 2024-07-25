import { AnySupport } from './Support.class.js'
import { ContextItem, DomTag, StringTag } from './Tag.class.js'
import { getNewGlobal } from './update/getNewGlobal.function.js'

export function buildSupportContext(
  support: AnySupport,
) {
  const global = support.subject.global
  const context = global.context = [] as ContextItem[]
  const thisTag = support.templater.tag as StringTag | DomTag
  const values = thisTag.values // this.values || thisTag.values

  for (const value of values) {
    // 🆕 First time values below
    context.push({
      value,
      global: getNewGlobal(),
    })
  }

  return context
}
