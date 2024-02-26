import { Tag } from "./Tag.class.js"
import { TagSupport } from "./TagSupport.class.js"
import { Config } from "./set.function.js"

const tagUse: TagUse[] = []

interface TagUse {
  // runs only one time at creation of component html elements
  beforeRender: (tagSupport: TagSupport, ownerTag: Tag) => void
  
  // runs every render
  beforeRedraw: (tagSupport: TagSupport, tag: Tag) => void
  
  // runs every render
  afterRender: (tagSupport: TagSupport, tag: Tag) => void
  
  beforeDestroy: (tagSupport: TagSupport, tag: Tag) => void
}

export type UseOptions = {
  beforeRender?: (tagSupport: TagSupport, ownerTag: Tag) => void
  beforeRedraw?: (tagSupport: TagSupport, tag: Tag) => void
  afterRender?: (tagSupport: TagSupport, tag: Tag) => void
  beforeDestroy?: (tagSupport: TagSupport, tag: Tag) => void
}

export function setUse(use: UseOptions) {
  // must provide defaults
  const useMe: TagUse = {
    beforeRender: use.beforeRender || (() => undefined),
    beforeRedraw: use.beforeRedraw || (() => undefined),
    afterRender: use.afterRender || (() => undefined),
    beforeDestroy: use.beforeDestroy || (() => undefined),
  }

  setUse.tagUse.push(useMe)
}

setUse.tagUse = tagUse
setUse.memory = {} as (Record<string,any> & {stateConfig: Config})
