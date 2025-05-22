// taggedjs-no-compile

import { TemplaterResult } from './getTemplaterResult.function.js'
import { AnySupport } from './AnySupport.type.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'

export type Tag = TagJsVar & {
  values: unknown[]

  templater?: TemplaterResult
  ownerSupport?: AnySupport
  
  debug?: boolean // Attach as () => {const h=html``;h.debug=true;return true}
  
  /** used in array.map() */
  key: (arrayValue: unknown) => Tag
  arrayValue?: any

  /** Used inside a tag/function to signify that innerHTML is expected */
  setInnerHTML: (innerHTML: any) => Tag
  /** Use this to set content to be render within another component */
  innerHTML?: Tag
  /** The true saved variable */
  _innerHTML?: Tag
  
  outerHTML?: Tag
}
