import { Context, StringTag, DomTag, ContextItem, EventMem } from './Tag.class.js'
import { BaseSupport, Support } from './Support.class.js'
import { Props } from '../Props.js'
import { TagWrapper } from './tag.utils.js'
import { Provider } from '../state/providers.js'
import { OnDestroyCallback } from '../state/onDestroy.js'
import { OnInitCallback } from '../state/onInit.js'
import { Subscription } from '../subject/subject.utils.js'
import { InsertBefore } from '../interpolations/InsertBefore.type.js'
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
  isAttr?: true
  element?: Element
  howToSet?: HowToSet
  isNameOnly?: boolean
  attrName?: string
  isSpecial?: boolean

  nowValueType?: ImmutableTypes | ValueType | BasicTypes
  lastValue?: any
  
  destroy$: Subject<any>
  oldest: BaseSupport | Support
  newest?: BaseSupport | Support
  context: Context // populated after reading interpolated.values array converted to an object {variable0, variable:1}
  providers?: Provider[]
  
  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: number
  deleted?: true
  isApp?: boolean // root element

  // ALWAYS template tag
  insertBefore?: InsertBefore // what element put down before
  placeholder?: Text // when insertBefore is taken up, the last element becomes or understanding of where to redraw to

  subscriptions?: Subscription<any>[] // subscriptions created by clones
  
  destroyCallback?: OnDestroyCallback // what to run when destroyed, used for onDestroy
  init?: OnInitCallback // what to run when init complete, used for onInit
  
  locked?: true
  blocked: (BaseSupport | Support)[], // renders that did not occur because an event was processing
  
  childTags: Support[], // tags on me
  // clones: Clone[],
  htmlDomMeta?: DomObjectChildren
  callbackMaker?: true
  simpleValueElm?: Clone

  // only appears on app
  events?: {[name: string]: EventMem[]}
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
    key: (arrayValue: unknown) => {
      templater.arrayValue = arrayValue
      return templater
    }
  }
  
  return templater
}
