// taggedjs-no-compile

import { State } from'../state/index.js'
import { InterpolatedTemplates } from '../interpolations/interpolations.js'

import { DomMetaMap } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { StringTag } from './StringTag.type.js'

export type EventCallback = (event: Event) => any
export type EventMem = {elm: Element, callback:EventCallback}

export type TagMemory = {
  state: State
}

export interface TagTemplate {
  interpolation: InterpolatedTemplates,
  string: string,
  strings: string[]
  values: unknown[]  
  domMetaMap?: DomMetaMap
}

export type ArrayItemStringTag<T> = StringTag & { arrayValue: T }

export type KeyFunction = 
/** Used in array.map() as array.map(x => html``.key(x))
 * - NEVER USE inline object key: array.map(x => html``.key({x}))
 * - NEVER USE inline array key: array.map((x, index) => html``.key([x, index]))
 */
<T>(arrayValue: T) => ArrayItemStringTag<T>

