// TODO: This should be more like `new TaggedJs().use({})`

import { Tag } from "./Tag.class.js"
import { TagSupport } from "./getTagSupport"
import { setUse } from "./setUse.function.js"

// Life cycle 1
export function runBeforeRender(
  tagSupport: TagSupport,
  tagOwner: Tag,
) {
  setUse.tagUse.forEach(tagUse => tagUse.beforeRender(tagSupport, tagOwner))
}

// Life cycle 2
export function runAfterRender(
  tagSupport: TagSupport,
  tag: Tag,
) {
  setUse.tagUse.forEach(tagUse => tagUse.afterRender(tagSupport, tag))
}

// Life cycle 3
export function runBeforeRedraw(
  tagSupport: TagSupport,
  tag: Tag,
) {
  setUse.tagUse.forEach(tagUse => tagUse.beforeRedraw(tagSupport, tag))
}

// Life cycle 4 - end of life
export function runBeforeDestroy(
  tagSupport: TagSupport,
  tag: Tag,
) {
  setUse.tagUse.forEach(tagUse => tagUse.beforeDestroy(tagSupport, tag))
}
