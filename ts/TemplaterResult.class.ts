import { Context, Tag } from './Tag.class'
import { BaseTagSupport, TagSupport } from './TagSupport.class'
import { Props } from './Props'
import { TagChildren } from './tag'
import { Provider } from './state/providers'
import { OnDestroyCallback } from './state/onDestroy'
import { TagSubject, WasTagSubject } from './subject.types'
import { OnInitCallback } from './state/onInit'
import { Subscription } from './subject/Subject.utils'
import { InsertBefore } from './Clones.type'

export type Wrapper = ((
  tagSupport: BaseTagSupport,
  subject: TagSubject,
) => TagSupport) & {
  original: () => Tag
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
  
  tag?: Tag

  constructor(
    public props: Props,
    public children: TagChildren,
  ) {}  
}
