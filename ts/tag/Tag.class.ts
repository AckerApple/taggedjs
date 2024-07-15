// taggedjs-no-compile

import { State } from'../state/index.js'
import { InterpolatedTemplates } from '../interpolations/interpolations.js'

import { TagGlobal, TemplaterResult } from './TemplaterResult.class.js'
import { TagValues } from'./html.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { DomMetaMap, LikeObjectChildren } from '../interpolations/optimizers/exchangeParsedForValues.function.js'
import { AnySupport } from './Support.class.js'
import { getSupportInCycle } from './getSupportInCycle.function.js'

export const variablePrefix = ':tagvar'
export const variableSuffix = ':'

// export type Context = TagJsSubject<any>[]
export type ContextItem = {
  global: TagGlobal
  value: any, tagJsType: any
  support?: AnySupport
}
export type Context = ContextItem[]

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

export class Tag {
  tagJsType?: typeof ValueTypes.tag | typeof ValueTypes.dom
  templater!: TemplaterResult
  ownerSupport?: AnySupport

  constructor(
    public values: unknown[],
  ) {
    this.ownerSupport = getSupportInCycle()
  }


  // DEPRECATED REMOVE
  /** Used for array, such as array.map(), calls aka array.map(x => html``.key(x)) */
  // present only when an array. Populated by Tag.key()
  // arrayValue?: unknown
  key(arrayValue: unknown) {
    ;(this as any).arrayValue = arrayValue
    return this
  }
}

export class StringTag extends Tag {
  tagJsType = ValueTypes.tag
  children?: {strings: string[] | TemplateStringsArray, values: TagValues}

  constructor(
    public strings: string[],
    public values: unknown[],
  ) {
    super(values)
  }

  html(
    strings: string[] | TemplateStringsArray,
    ...values: TagValues
  ) {
    this.children = {strings, values}
    return this
  }
}

export class DomTag extends Tag {
  tagJsType = ValueTypes.dom
  children?: {dom: LikeObjectChildren, values: TagValues}

  constructor(
    // public dom: ObjectChildren,
    public dom: LikeObjectChildren,
    public values: unknown[],
  ) {
    super(values)
  }

  html = {
    // $this: this,
    dom: (
      // a loose typing for better compatibility with compiled code
      dom: LikeObjectChildren, // ObjectChildren
      ...values: TagValues    
    ): DomTag => {
      this.children = {dom: dom, values}
      return this
    }
  }
}
