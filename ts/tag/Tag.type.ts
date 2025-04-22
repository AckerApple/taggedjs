// taggedjs-no-compile


import { TemplaterResult } from './getTemplaterResult.function.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { AnySupport } from './getSupport.function.js'

export type Tag = {
  values: unknown[]
  
  tagJsType?: typeof ValueTypes.tag | typeof ValueTypes.dom
  templater?: TemplaterResult
  ownerSupport?: AnySupport
  
  debug?: boolean // Attach as () => {const h=html``;h.debug=true;return true}
  
  /** used in array.map() */
  key: (arrayValue: unknown) => Tag
  arrayValue?: any
}
