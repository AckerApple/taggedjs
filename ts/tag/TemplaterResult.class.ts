import { Context, Tag } from './Tag.class.js'
import { BaseSupport, Support } from './Support.class.js'
import { Props } from '../Props.js'
import { TagChildren, TagWrapper } from './tag.utils.js'
import { Provider } from '../state/providers.js'
import { OnDestroyCallback } from '../state/onDestroy.js'
import { TagSubject } from '../subject.types.js'
import { OnInitCallback } from '../state/onInit.js'
import { Subscription } from '../subject/subject.utils.js'
import { InsertBefore } from '../interpolations/InsertBefore.type.js'
import { TagValues } from './html.js'
import { Subject, ValueSubject } from '../subject/index.js'
import { kidsToTagArraySubject } from './kidsToTagArraySubject.function.js'
import { ValueTypes } from './ValueTypes.enum.js'

export type OriginalFunction = (() => Tag) & {compareTo: string}

export type Wrapper = ((
  newSupport: BaseSupport | Support,
  subject: TagSubject,
  prevSupport?: BaseSupport | Support,
) => Support) & {
  parentWrap: TagWrapper<any>
}

export type TagGlobal = {
  destroy$: Subject<any>
  oldest: BaseSupport | Support
  newest?: BaseSupport | Support
  context: Context // populated after reading interpolated.values array converted to an object {variable0, variable:1}
  providers: Provider[]
  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: number
  deleted?: true
  isApp?: boolean // root element
  
  // ALWAYS template tag
  insertBefore?: InsertBefore // what element put down before
  placeholder?: Text // when insertBefore is taken up, the last element becomes or understanding of where to redraw to


  subscriptions: Subscription<any>[] // subscriptions created by clones
  
  destroyCallback?: OnDestroyCallback // what to run when destroyed, used for onDestroy
  init?: OnInitCallback // what to run when init complete, used for onInit
  
  locked?: true
  blocked: (BaseSupport | Support)[], // renders that did not occur because an event was processing
  
  childTags: Support[], // tags on me
  clones: (Element | Text | ChildNode)[],
  callbackMaker?: true
}

export class TemplaterResult {
  tagJsType = ValueTypes.templater
  tagged!: boolean
  wrapper?: Wrapper

  madeChildIntoSubject?: boolean
  
  tag?: Tag
  children: TagChildren = new ValueSubject([] as Tag[])
  arrayValue?: unknown // used for tag components used in arrays

  constructor(public props: Props) {}

  key (arrayValue: unknown) {
    this.arrayValue = arrayValue
    return this
  }

  html(
    strings: string[] | TemplateStringsArray,
    ...values: TagValues
  ) {
    const children = new Tag(strings as string[], values)
    const childSubject = kidsToTagArraySubject(children, this)
    this.children = childSubject
    return this
  }
}
