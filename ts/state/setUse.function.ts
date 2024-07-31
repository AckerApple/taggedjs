import { BaseSupport, Support } from '../tag/Support.class.js'
import { Config } from './state.utils.js'

export type UseOptions = {
  beforeRender?: (
    support: Support | BaseSupport,
    ownerTag?: Support | BaseSupport, // not defined on tagElement app
  ) => void
  beforeRedraw?: (support: BaseSupport | Support, tag: Support | BaseSupport) => void
  afterRender?: (support: BaseSupport | Support, ownerSupport?: Support | BaseSupport) => void
  beforeDestroy?: (support: BaseSupport | Support, tag: Support | BaseSupport) => void
}

export const setUseMemory = {} as UseMemory

type UseMemory = (Record<string,any> & {
  stateConfig: Config
  currentSupport: Support // tag being rendered
})
