import { Tag } from './Tag.class'
import { BaseTagSupport } from './TagSupport.class'
import { Config } from './set.function'

const tagUse: TagUse[] = []

interface TagUse {
  // runs only one time at creation of component html elements
  beforeRender: (tagSupport: BaseTagSupport, ownerTag: Tag) => void
  
  // runs every render
  beforeRedraw: (tagSupport: BaseTagSupport, tag: Tag) => void
  
  // runs every render
  afterRender: (tagSupport: BaseTagSupport, tag: Tag) => void
  
  beforeDestroy: (tagSupport: BaseTagSupport, tag: Tag) => void
}

export type UseOptions = {
  beforeRender?: (tagSupport: BaseTagSupport, ownerTag: Tag) => void
  beforeRedraw?: (tagSupport: BaseTagSupport, tag: Tag) => void
  afterRender?: (tagSupport: BaseTagSupport, tag: Tag) => void
  beforeDestroy?: (tagSupport: BaseTagSupport, tag: Tag) => void
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
