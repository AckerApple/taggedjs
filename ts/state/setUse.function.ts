import { BaseTagSupport, TagSupport } from '../tag/TagSupport.class.js'
import { Config } from './state.utils.js'

const tagUse: TagUse[] = []

interface TagUse {
  // runs only one time at creation of component html elements
  beforeRender: (tagSupport: BaseTagSupport | TagSupport, ownerTag?: TagSupport | BaseTagSupport) => void
  
  // runs every render
  beforeRedraw: (tagSupport: BaseTagSupport | TagSupport, tag: TagSupport | BaseTagSupport) => void
  
  // runs every render
  afterRender: (tagSupport: BaseTagSupport | TagSupport, ownerTagSupport?: TagSupport | BaseTagSupport) => void
  
  beforeDestroy: (tagSupport: BaseTagSupport | TagSupport, tag: TagSupport | BaseTagSupport) => void
}

export type UseOptions = {
  beforeRender?: (
    tagSupport: TagSupport | BaseTagSupport,
    ownerTag?: TagSupport | BaseTagSupport, // not defined on tagElement app
  ) => void
  beforeRedraw?: (tagSupport: BaseTagSupport | TagSupport, tag: TagSupport | BaseTagSupport) => void
  afterRender?: (tagSupport: BaseTagSupport | TagSupport, ownerTagSupport?: TagSupport | BaseTagSupport) => void
  beforeDestroy?: (tagSupport: BaseTagSupport | TagSupport, tag: TagSupport | BaseTagSupport) => void
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
setUse.memory = {} as UseMemory

type UseMemory = (Record<string,any> & {
  stateConfig: Config
  currentSupport: TagSupport // tag being rendered
})
