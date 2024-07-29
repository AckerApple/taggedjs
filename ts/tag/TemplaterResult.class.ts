import { Context, StringTag, DomTag, ContextItem, EventCallback } from './Tag.class.js'
import { BaseSupport, Support } from './Support.class.js'
import { Props } from '../Props.js'
import { TagWrapper } from './tag.utils.js'
import { Provider } from '../state/providers.js'
import { OnDestroyCallback } from '../state/onDestroy.js'
import { OnInitCallback } from '../state/onInit.js'
import { Subscription } from '../subject/subject.utils.js'
import { Subject } from '../subject/index.js'
import { BasicTypes, ImmutableTypes, ValueType, ValueTypes } from './ValueTypes.enum.js'
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { HowToSet } from '../interpolations/attributes/howToSetInputValue.function.js'

export type OriginalFunction = (() => StringTag)

export type Wrapper = ((
  newSupport: BaseSupport | Support,
  subject: ContextItem,
  prevSupport?: BaseSupport | Support,
) => Support) & {
  tagJsType: typeof ValueTypes.tagComponent | typeof ValueTypes.oneRender | typeof ValueTypes.templater
  parentWrap: TagWrapper<any>
}

export type TagGlobal = {
  // SUPPORTS
  htmlDomMeta?: DomObjectChildren
  
  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: number
  deleted?: true
  isApp?: boolean // root element

  subscriptions?: Subscription<any>[] // subscriptions created by clones

  destroyCallback?: OnDestroyCallback // what to run when destroyed, used for onDestroy
  
  locked?: true
  
  callbackMaker?: true
  
  // only appears on app
  events?: Events
}

export type SupportTagGlobal = TagGlobal & {
  destroy$: Subject<any>
  blocked: (BaseSupport | Support)[], // renders that did not occur because an event was processing
  oldest: BaseSupport | Support
  newest: BaseSupport | Support
  context: Context // populated after reading interpolated.values array converted to an object {variable0, variable:1}
  
  init?: OnInitCallback // what to run when init complete, used for onInit
  providers?: Provider[]
}

export type Events = {
  [name: string]: EventCallback
}

export type Clone = (Element | Text | ChildNode)

export type TemplaterResult = {
  tagJsType: ValueType
  wrapper?: Wrapper
  tag?: StringTag | DomTag
  props?: Props

  arrayValue?: unknown
  key: (arrayValue: unknown) => TemplaterResult
}
export function getTemplaterResult(props?: Props) {
  const templater: TemplaterResult = {
    props,
    tagJsType: ValueTypes.templater,
    key: function keyTemplate(arrayValue: unknown) {
      templater.arrayValue = arrayValue
      return templater
    }
  }
  
  return templater
}
