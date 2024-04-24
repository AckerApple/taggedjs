import { BaseTagSupport, TagSupport } from '../TagSupport.class'
import { ProviderConfig } from './providers'
import { Config } from './state.utils'

const tagUse: TagUse[] = []

interface TagUse {
  // runs only one time at creation of component html elements
  beforeRender: (tagSupport: BaseTagSupport, ownerTag?: TagSupport) => void
  
  // runs every render
  beforeRedraw: (tagSupport: BaseTagSupport, tag: TagSupport) => void
  
  // runs every render
  afterRender: (tagSupport: BaseTagSupport, tag: TagSupport) => void
  
  beforeDestroy: (tagSupport: BaseTagSupport, tag: TagSupport) => void
}

export type UseOptions = {
  beforeRender?: (
    tagSupport: BaseTagSupport,
    ownerTag?: TagSupport, // not defined on tagElement app
  ) => void
  beforeRedraw?: (tagSupport: BaseTagSupport, tag: TagSupport) => void
  afterRender?: (tagSupport: BaseTagSupport, tag: TagSupport) => void
  beforeDestroy?: (tagSupport: BaseTagSupport, tag: TagSupport) => void
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
setUse.memory = {} as (Record<string,any> & {
  stateConfig: Config
  providerConfig: ProviderConfig
  initCurrentSupport: TagSupport
})
