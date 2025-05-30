// taggedjs-no-compile

import { TemplaterResult } from './getTemplaterResult.function.js'
import { AnySupport } from './AnySupport.type.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import { TagJsVarInnerHTML } from '../tagJsVars/getInnerHTML.function.js'

export type Tag = TagJsVar & {
  values: unknown[]

  templater?: TemplaterResult
  ownerSupport?: AnySupport
  
  debug?: boolean // Attach as () => {const h=html``;h.debug=true;return true}
  
  /** used in array.map() */
  key: (arrayValue: unknown) => Tag
  arrayValue?: any
  
  /** Used INSIDE a tag/function to signify that innerHTML is expected */
  acceptInnerHTML: (useTagVar: TagJsVar) => Tag
  
  /** Use this to set content to be render within another component */
  innerHTML?: Tag
  /** Same as innerHTML = x */
  setHTML: (innerHTML: any) => Tag

  /** The true saved innerHTML variable */
  _innerHTML?: Tag
  
  outerHTML?: Tag
}
