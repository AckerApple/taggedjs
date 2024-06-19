// taggedjs-no-compile

import { State } from'../state/index.js'
import { InterpolatedTemplates } from '../interpolations/interpolations.js'

import { TemplaterResult } from './TemplaterResult.class.js'
import { TagValues } from'./html.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { TagJsSubject } from './update/TagJsSubject.class.js'
import { ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js'


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

export class BaseTag {
  tagJsType?: string

  // present only when an array. Populated by Tag.key()
  arrayValue?: unknown

  templater!: TemplaterResult

  constructor(
    public values: unknown[],
  ) {}

  /** Used for array, such as array.map(), calls aka array.map(x => html``.key(x)) */
  key(arrayValue: unknown) {
    this.arrayValue = arrayValue
    return this
  }
}

export class Tag extends BaseTag {
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

export class Dom extends BaseTag {
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
      dom: ObjectChildren,
      ...values: TagValues    
    ): Dom => {
      this.children = {dom, values}
      return this
    }
  }
}
