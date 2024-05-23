import { Context, Tag } from './tag/Tag.class'
import { BaseTagSupport, TagSupport } from './tag/TagSupport.class'
import { Props } from './Props'
import { kidsToTagArraySubject } from './tag/tag'
import { TagChildren, TagWrapper } from './tag/tag.utils'
import { Provider } from './state/providers'
import { OnDestroyCallback } from './state/onDestroy'
import { TagSubject } from './subject.types'
import { OnInitCallback } from './state/onInit'
import { Subscription } from './subject/subject.utils'
import { InsertBefore } from './interpolations/Clones.type'
import { TagValues } from './tag/html'
import { ValueSubject } from './subject'

export type OriginalFunction = (() => Tag) & {compareTo: string}

export type Wrapper = ((
  tagSupport: BaseTagSupport,
  subject: TagSubject,
) => TagSupport) & {
  parentWrap: TagWrapper<any>
}

export type TagGlobal = {
  oldest?: TagSupport
  newest?: TagSupport
  context: Context // populated after reading interpolated.values array converted to an object {variable0, variable:1}
  providers: Provider[]
  /** Indicator of re-rending. Saves from double rending something already rendered */
  renderCount: number
  deleted: boolean
  isApp?: boolean // root element
  
  // ALWAYS template tag
  insertBefore?: InsertBefore // what element put down before
  placeholder?: Text // when insertBefore is taken up, the last element becomes or understanding of where to redraw to


  subscriptions: Subscription<any>[] // subscriptions created by clones
  
  destroyCallback?: OnDestroyCallback // what to run when destroyed, used for onDestroy
  init?: OnInitCallback // what to run when init complete, used for onInit
}

export class TemplaterResult {
  isTemplater = true
  tagged!: boolean
  wrapper?: Wrapper

  madeChildIntoSubject = false
  
  tag?: Tag
  children: TagChildren = new ValueSubject([] as Tag[])

  constructor(public props: Props) {}

  html(
    strings: string[] | TemplateStringsArray,
    ...values: TagValues
  ) {
    const children = new Tag(strings as string[], values)
    const { childSubject, madeSubject } = kidsToTagArraySubject(children)
    this.children = childSubject
    
    this.madeChildIntoSubject = madeSubject
    return this
  }
}
