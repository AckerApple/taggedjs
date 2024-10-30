import { StringTag, DomTag, EventCallback } from './Tag.class.js'
import { ContextItem } from './Context.types.js'
import { AnySupport, SupportContextItem } from './Support.class.js'
import { Props } from '../Props.js'
import { TagWrapper } from './tag.utils.js'
import { Provider } from '../state/providers.js'
import { OnDestroyCallback } from '../state/onDestroy.js'
import { Subscription } from '../subject/subject.utils.js'
import { Subject } from '../subject/index.js'
import { ValueType, ValueTypes } from './ValueTypes.enum.js'
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { PropWatches } from './tag.js'

export type Wrapper = ((
  newSupport: AnySupport,
  subject: ContextItem,
  prevSupport?: AnySupport,
) => AnySupport) & TagWrapper<unknown> & {
  tagJsType: typeof ValueTypes.tagComponent | typeof ValueTypes.renderOnce | typeof ValueTypes.templater
}

export type TagGlobal = {
  htmlDomMeta?: DomObjectChildren

  deleted?: true
  isApp?: boolean // root element

  subscriptions?: Subscription<unknown>[] // subscriptions created by clones

  destroyCallback?: OnDestroyCallback // what to run when destroyed, used for onDestroy
  
  locked?: true
  
  callbackMaker?: true
}

export type SupportTagGlobal = TagGlobal & {
  destroy$: Subject<void>
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
  tagJsType: ValueType
  wrapper?: Wrapper
  tag?: StringTag | DomTag
  props?: Props

  arrayValue?: unknown
  key: (arrayValue: unknown) => TemplaterResult
}

export function getTemplaterResult(
  propWatch: PropWatches,
  props?: Props,
) {
  const templater: TemplaterResult = {
    propWatch,
    props,
    tagJsType: ValueTypes.templater,
    key: function keyTemplate(arrayValue: unknown) {
      templater.arrayValue = arrayValue
      return templater
    }
  }
  
  return templater
}
