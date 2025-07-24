import { EventCallback } from './getDomTag.function.js'
import { ContextItem } from './ContextItem.type.js'
import { AnySupport } from './AnySupport.type.js'
import { SupportContextItem } from './SupportContextItem.type.js'
import { Props } from '../Props.js'
import { TagWrapper } from './tag.utils.js'
import { Provider } from '../state/providers.js'
import { OnDestroyCallback } from '../state/onDestroy.js'
import { Subscription } from '../subject/subject.utils.js'
import { Subject } from '../subject/index.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { DomObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'
import { PropWatches } from '../tagJsVars/tag.function.js'
import { ProcessInit } from './ProcessInit.type.js'
import { processTagInit } from './update/processTagInit.function.js'
import { Tag } from './Tag.type.js'
import { ProcessDelete, TagJsTag } from '../tagJsVars/tagJsVar.type.js'
import { checkTagValueChange, destroySupportByContextItem } from './checkTagValueChange.function.js'
import { CheckSupportValueChange, CheckValueChange } from './Context.types.js'
import { tagValueUpdateHandler } from './update/tagValueUpdateHandler.function.js'
import { ProcessUpdate } from './ProcessUpdate.type.js'
import { blankHandler } from '../render/dom/attachDomElements.function.js'

export type Wrapper = ((
  newSupport: AnySupport,
  subject: ContextItem,
  prevSupport?: AnySupport,
) => AnySupport) & TagWrapper<unknown> & {
  tagJsType: typeof ValueTypes.tagComponent | typeof ValueTypes.renderOnce | typeof ValueTypes.templater
  processInit: ProcessInit
  processUpdate: ProcessUpdate
  checkValueChange: CheckValueChange | CheckSupportValueChange
  delete: ProcessDelete
}

/** NOT shared across variable spots. The Subject/ContextItem is more global than this is */
export type TagGlobal = {
  // renderCount: number
  htmlDomMeta?: DomObjectChildren

  deleted?: true
  isApp?: boolean // root element

  subscriptions?: Subscription<unknown>[] // subscriptions created by clones

  destroyCallback?: OnDestroyCallback // what to run when destroyed, used for onDestroy
    
  callbackMaker?: true
}

export type SupportTagGlobal = TagGlobal & {
  destroy$: Subject<void> // not on non-tags

  blocked: AnySupport[], // renders that did not occur because an event was processing
  oldest: AnySupport
  newest: AnySupport
  contexts: SupportContextItem[] // populated after reading interpolated.values array converted to an object {variable0, variable:1}
  
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

export type TemplaterResult = TagJsTag & {
  tagJsType: string // ValueType
  processInit: ProcessInit

  propWatch: PropWatches
  wrapper?: Wrapper
  tag?: Tag // StringTag | DomTag
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
    tagJsType: ValueTypes.templater,
    processInit: processTagInit,
    processInitAttribute: blankHandler,
    processUpdate: tagValueUpdateHandler,
    checkValueChange: checkTagValueChange,
    delete: destroySupportByContextItem,

    propWatch,
    props,
    key: function keyTemplate<T>(arrayValue: T) {
      (templater as TemplaterResultArrayItem<T>).arrayValue = arrayValue
      return templater
    }
  }
  
  return templater
}
