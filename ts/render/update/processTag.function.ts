import type { StringTag } from '../../tag/StringTag.type.js'
import type { DomTag } from '../../tag/DomTag.type.js'

export function tagFakeTemplater(
  tag: StringTag | DomTag
) {
  const templater = getFakeTemplater() as any
  templater.tag = tag
  tag.templater = templater

  return templater
}

export function getFakeTemplater() {
}
