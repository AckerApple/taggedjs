// taggedjs-no-compile

import { TagValues } from'./html.js'
import { LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { StringTag } from './StringTag.type.js'
import { TagJsComponent } from '../TagJsTags/index.js'

export type { StringTag }
export const variablePrefix = ':tagvar'
export const variableSuffix = ':'

export type EventCallback = (event: Event) => any
export type EventMem = {elm: Element, callback:EventCallback}

export type DomTag = TagJsComponent<any> & {
  children?: {
    dom: LikeObjectChildren
    values: TagValues
  }
  dom: LikeObjectChildren
  values: unknown[]

  /** used in array.map() */
  key: (arrayValue: unknown) => DomTag
  arrayValue?: any

  html: {
    dom: (
      dom: LikeObjectChildren, // ObjectChildren
      values: TagValues,
    ) => DomTag
  }
}