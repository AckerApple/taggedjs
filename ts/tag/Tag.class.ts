import { Counts } from'../interpolations/interpolateTemplate.js'
import { State } from'../state/index.js'
import { InterpolatedTemplates } from '../interpolations/interpolations.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { TagValues } from'./html.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { TagJsSubject } from './update/TagJsSubject.class.js'

export const variablePrefix = '__tagvar'
export const escapeVariable = '--' + variablePrefix + '--'

export const escapeSearch = new RegExp(escapeVariable, 'g')

export type Context = {
  [index: string]: TagJsSubject<any> // ValueSubject<unknown>
}
export type TagMemory = {
  // context: Context
  state: State
}

export interface TagTemplate {
  interpolation: InterpolatedTemplates,
  string: string,
  strings: string[],
  values: unknown[]
}

export class Tag {
  tagJsType = ValueTypes.tag
  children?: {strings: string[] | TemplateStringsArray, values: TagValues}

  // present only when an array. Populated by Tag.key()
  memory = {
  } as {
    arrayValue?: unknown
  }

  templater!: TemplaterResult
  
  constructor(
    public strings: string[],
    public values: any[],
  ) {}

  /** Used for array, such as array.map(), calls aka array.map(x => html``.key(x)) */
  key(arrayValue: unknown) {
    this.memory.arrayValue = arrayValue
    return this
  }

  html(
    strings: string[] | TemplateStringsArray,
    ...values: TagValues
  ) {
    this.children = {strings, values}
    return this
  }
}

export type ElementBuildOptions = {
  counts: Counts
}
