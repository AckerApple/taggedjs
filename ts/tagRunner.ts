import { Tag } from "./Tag.class.js"
import { TagSupport } from "./getTagSupport"

interface TagUse {
  beforeRender: (tagSupport: TagSupport, tag?: Tag) => void
  beforeRedraw: (tagSupport: TagSupport, tag: Tag) => void
  afterRender: (tagSupport: TagSupport, tag: Tag) => void
}

export const tagUse: TagUse[] = []

export function runBeforeRender(
  tagSupport: TagSupport,
  tag?: Tag,
) {
  tagUse.forEach(tagUse => tagUse.beforeRender(tagSupport, tag))
}

export function runAfterRender(
  tagSupport: TagSupport,
  tag: Tag,
) {
  tagUse.forEach(tagUse => tagUse.afterRender(tagSupport, tag))
}

export function runBeforeRedraw(
  tagSupport: TagSupport,
  tag: Tag,
) {
  tagUse.forEach(tagUse => tagUse.beforeRedraw(tagSupport, tag))
}

export function setUse(use: {
  beforeRender?: (tagSupport: TagSupport, tag?: Tag) => void
  beforeRedraw?: (tagSupport: TagSupport, tag: Tag) => void
  afterRender?: (tagSupport: TagSupport, tag: Tag) => void
}) {
  const useMe: TagUse = {
    beforeRender: use.beforeRender || (() => undefined),
    beforeRedraw: use.beforeRedraw || (() => undefined),
    afterRender: use.afterRender || (() => undefined),
  }

  tagUse.push(useMe)
}