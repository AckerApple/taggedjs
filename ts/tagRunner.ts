// TODO: This should be more like `new TaggedJs().use({})`

import { Tag } from "./Tag.class.js"
import { TagSupport } from "./getTagSupport"

export type UseOptions = {
  beforeRender?: (tagSupport: TagSupport, tag?: Tag) => void
  beforeRedraw?: (tagSupport: TagSupport, tag: Tag) => void
  afterRender?: (tagSupport: TagSupport, tag: Tag) => void
  beforeDestroy?: (tagSupport: TagSupport, tag: Tag) => void
  afterTagClone?: (oldTag: Tag, newTag: Tag) => void
}

interface TagUse {
  beforeRender: (tagSupport: TagSupport, tag?: Tag) => void
  beforeRedraw: (tagSupport: TagSupport, tag: Tag) => void
  afterRender: (tagSupport: TagSupport, tag: Tag) => void
  beforeDestroy: (tagSupport: TagSupport, tag: Tag) => void
  afterTagClone: (oldTag: Tag, newTag: Tag) => void
}

export const tagUse: TagUse[] = []

// Life cycle 1
export function runBeforeRender(
  tagSupport: TagSupport,
  tag?: Tag,
) {
  tagUse.forEach(tagUse => tagUse.beforeRender(tagSupport, tag))
}

// Life cycle 1.1
export function runAfterTagClone(
  oldTag: Tag,
  newTag: Tag,
) {
  tagUse.forEach(tagUse => tagUse.afterTagClone(oldTag, newTag))
}

// Life cycle 2
export function runAfterRender(
  tagSupport: TagSupport,
  tag: Tag,
) {
  tagUse.forEach(tagUse => tagUse.afterRender(tagSupport, tag))
}


// Life cycle 3
export function runBeforeRedraw(
  tagSupport: TagSupport,
  tag: Tag,
) {
  tagUse.forEach(tagUse => tagUse.beforeRedraw(tagSupport, tag))
}

// Life cycle 4 - end of life
export function runBeforeDestroy(
  tagSupport: TagSupport,
  tag: Tag,
) {
  tagUse.forEach(tagUse => tagUse.beforeDestroy(tagSupport, tag))
}

export function setUse(use: UseOptions) {
  // must provide defaults
  const useMe: TagUse = {
    beforeRender: use.beforeRender || (() => undefined),
    beforeRedraw: use.beforeRedraw || (() => undefined),
    afterRender: use.afterRender || (() => undefined),
    beforeDestroy: use.beforeDestroy || (() => undefined),
    afterTagClone: use.afterTagClone || (() => undefined),
  }

  tagUse.push(useMe)
}
