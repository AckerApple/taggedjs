// TODO: This should be more like `new TaggedJs().use({})`

import { Tag } from './Tag.class'
import { BaseTagSupport } from './TagSupport.class'
import { setUse } from './setUse.function'

// Life cycle 1
export function runBeforeRender(
  tagSupport: BaseTagSupport,
  tagOwner: Tag,
) {
  setUse.tagUse.forEach(tagUse => tagUse.beforeRender(tagSupport, tagOwner))
}

// Life cycle 2
export function runAfterRender(
  tagSupport: BaseTagSupport,
  tag: Tag,
) {
  setUse.tagUse.forEach(tagUse => tagUse.afterRender(tagSupport, tag))
}

// Life cycle 3
export function runBeforeRedraw(
  tagSupport: BaseTagSupport,
  tag: Tag,
) {
  setUse.tagUse.forEach(tagUse => tagUse.beforeRedraw(tagSupport, tag))
}

// Life cycle 4 - end of life
export function runBeforeDestroy(
  tagSupport: BaseTagSupport,
  tag: Tag,
) {
  setUse.tagUse.forEach(tagUse => tagUse.beforeDestroy(tagSupport, tag))
}
