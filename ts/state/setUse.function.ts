import { BaseSupport, Support } from '../tag/Support.class.js'
import { Config } from './state.utils.js'

const tagUse: TagUse[] = []

interface TagUse {
  // runs only one time at creation of component html elements
  beforeRender: (support: BaseSupport | Support, ownerTag?: Support | BaseSupport) => void
  
  // runs every render
  beforeRedraw: (support: BaseSupport | Support, tag: Support | BaseSupport) => void
  
  // runs every render
  afterRender: (support: BaseSupport | Support, ownerSupport?: Support | BaseSupport) => void
  
  beforeDestroy: (support: BaseSupport | Support, tag: Support | BaseSupport) => void
}

export type UseOptions = {
  beforeRender?: (
    support: Support | BaseSupport,
    ownerTag?: Support | BaseSupport, // not defined on tagElement app
  ) => void
  beforeRedraw?: (support: BaseSupport | Support, tag: Support | BaseSupport) => void
  afterRender?: (support: BaseSupport | Support, ownerSupport?: Support | BaseSupport) => void
  beforeDestroy?: (support: BaseSupport | Support, tag: Support | BaseSupport) => void
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
  currentSupport: Support // tag being rendered
})
