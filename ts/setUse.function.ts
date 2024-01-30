import { Tag } from "./Tag.class.js"
import { TagSupport } from "./getTagSupport"

const tagUse: TagUse[] = []

interface TagUse {
  beforeRender: (tagSupport: TagSupport, tag?: Tag) => void
  beforeRedraw: (tagSupport: TagSupport, tag: Tag) => void
  afterRender: (tagSupport: TagSupport, tag: Tag) => void
  beforeDestroy: (tagSupport: TagSupport, tag: Tag) => void
  afterTagClone: (oldTag: Tag, newTag: Tag) => void
}

export type UseOptions = {
  beforeRender?: (tagSupport: TagSupport, tag?: Tag) => void
  beforeRedraw?: (tagSupport: TagSupport, tag: Tag) => void
  afterRender?: (tagSupport: TagSupport, tag: Tag) => void
  beforeDestroy?: (tagSupport: TagSupport, tag: Tag) => void
  afterTagClone?: (oldTag: Tag, newTag: Tag) => void
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

  setUse.tagUse.push(useMe)
}


setUse.tagUse = tagUse
setUse.memory = {} as Record<string,any>