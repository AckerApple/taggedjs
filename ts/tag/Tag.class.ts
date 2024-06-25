// taggedjs-no-compile

import { State } from'../state/index.js'
import { InterpolatedTemplates } from '../interpolations/interpolations.js'

import { TemplaterResult } from './TemplaterResult.class.js'
import { TagValues } from'./html.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { TagJsSubject } from './update/TagJsSubject.class.js'
import { LikeObjectChildren, ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'


export const variablePrefix = ':tagvar'
export const variableSuffix = ':'
export const escapeVariable = '--' + variablePrefix + '--'

export const escapeSearch = new RegExp(escapeVariable, 'g')

export type Context = TagJsSubject<any>[]

export type TagMemory = {
  // context: Context
  state: State
}

export interface TagTemplate {
  interpolation: InterpolatedTemplates,
  string: string,
  strings: string[]
  values: unknown[]
  domMeta?: ObjectChildren
}

export class Tag {
  tagJsType?: typeof ValueTypes.tag | typeof ValueTypes.dom
  templater!: TemplaterResult

  constructor(
    public values: unknown[],
  ) {}


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
  children?: {dom: ObjectChildren, values: TagValues}

  constructor(
    public dom: ObjectChildren,
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
      this.children = {dom, values}
      return this
    }
  }
}
