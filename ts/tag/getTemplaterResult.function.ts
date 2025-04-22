import { EventCallback } from './getDomTag.function.js'
import { StringTag } from './StringTag.type.js'
import { DomTag } from './DomTag.type.js'
import { ContextItem } from './Context.types.js'
import { AnySupport, SupportContextItem } from './getSupport.function.js'
import { Props } from '../Props.js'
import { TagWrapper } from './tag.utils.js'
import { Provider } from '../state/providers.js'
import { OnDestroyCallback } from '../state/onDestroy.js'
import { Subscription } from '../subject/subject.utils.js'
import { Subject } from '../subject/index.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { PropWatches } from './tag.function.js'

export type Wrapper = ((
  newSupport: AnySupport,
  subject: ContextItem,
  prevSupport?: AnySupport,
) => AnySupport) & TagWrapper<unknown> & {
  tagJsType: typeof ValueTypes.tagComponent | typeof ValueTypes.renderOnce | typeof ValueTypes.templater
}

/** NOT shared across variable spots. The Subject/ContextItem is more global than this is */
export type TagGlobal = {
  // renderCount: number
  htmlDomMeta?: DomObjectChildren

  deleted?: true
  isApp?: boolean // root element

  subscriptions?: Subscription<unknown>[] // subscriptions created by clones

  destroyCallback?: OnDestroyCallback // what to run when destroyed, used for onDestroy
  
  locked?: true
  
  callbackMaker?: true
  
  destroys?: (() => any)[]
}

export type SupportTagGlobal = TagGlobal & {
  destroy$: Subject<void> // not on non-tags

  blocked: AnySupport[], // renders that did not occur because an event was processing
  oldest: AnySupport
  newest: AnySupport
  context: SupportContextItem[] // populated after reading interpolated.values array converted to an object {variable0, variable:1}
  
  providers?: Provider[]
}

export type BaseTagGlobal =SupportTagGlobal & {
  // only appears on app
  events?: Events
}

export type Events = {
  [name: string]: EventCallback
}

export type Clone = (Element | Text | ChildNode)

export type TemplaterResult = {
  propWatch: PropWatches
  tagJsType: string // ValueType
  wrapper?: Wrapper
  tag?: StringTag | DomTag
  props?: Props

  /** Used inside of an array.map() function */
  key: <T>(arrayValue: T) => TemplaterResultArrayItem<T>
}

export type TemplaterResultArrayItem<T> = TemplaterResult & {
  arrayValue?: T  
}


export function getTemplaterResult(
  propWatch: PropWatches,
  props?: Props,
) {
  const templater: TemplaterResult = {
    propWatch,
    props,
    tagJsType: ValueTypes.templater,
    key: function keyTemplate<T>(arrayValue: T) {
      (templater as TemplaterResultArrayItem<T>).arrayValue = arrayValue
      return templater
    }
  }
  
  return templater
}
