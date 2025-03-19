// taggedjs-no-compile

import { State } from'../state/index.js'
import { InterpolatedTemplates } from '../interpolations/interpolations.js'

import { TemplaterResult } from './getTemplaterResult.function.js'
import { TagValues } from'./html.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { DomMetaMap, LikeObjectChildren } from '../interpolations/optimizers/LikeObjectElement.type.js'
import { AnySupport } from './getSupport.function.js'
import { getSupportInCycle } from './getSupportInCycle.function.js'
import { StringTag } from './StringTag.type.js'

export { StringTag }
export const variablePrefix = ':tagvar'
export const variableSuffix = ':'

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

export type Tag = {
  debug?: boolean

  values: unknown[]
  tagJsType?: typeof ValueTypes.tag | typeof ValueTypes.dom
  templater?: TemplaterResult
  ownerSupport?: AnySupport

  arrayValue?: any
}

export type KeyFunction = (arrayValue: unknown) => StringTag

export function getStringTag(
  strings: string[],
  values: unknown[],
): StringTag {
  const tag: StringTag = {
    values,
    ownerSupport: getSupportInCycle(),
    
    tagJsType: ValueTypes.tag,
    strings,
    key(arrayValue: unknown) {
      tag.arrayValue = arrayValue
      return tag
    },  
    html: function html(
      strings: string[] | TemplateStringsArray,
      values: TagValues,
    ) {
      tag.children = {strings, values}
      return tag
    }
  }

  return tag
}

export type DomTag = Tag & {
  children?: {
    dom: LikeObjectChildren
    values: TagValues
  }
  dom: LikeObjectChildren
  values: unknown[]
  key: (arrayValue: unknown) => DomTag

  html: {
    dom: (
      dom: LikeObjectChildren, // ObjectChildren
      values: TagValues,
    ) => DomTag
  }
}

export function getDomTag(
  dom: LikeObjectChildren,
  values: unknown[],
): DomTag {
  const tag: DomTag = {
    values,
    ownerSupport: getSupportInCycle(),
    dom,
    tagJsType: ValueTypes.dom,
    key: function keyFun(arrayValue: unknown) {
      tag.arrayValue = arrayValue
      return tag
    },
    html: {
      dom: function dom(
        dom: LikeObjectChildren, // ObjectChildren
        values: TagValues,
      ): DomTag {
        tag.children = {dom: dom, values}
        return tag
      }
    }
  }
  return tag
}
