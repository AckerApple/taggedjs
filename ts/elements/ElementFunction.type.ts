import { KeyFunction, TagJsComponent } from '../index.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js'
import type { AttributeCallable } from './attributeCallables.js'
import { ElementVarBase } from './ElementVarBase.type.js'
import { Attributes } from './htmlTag.function'

export type CombinedElementFunctions = ElementVarBase & {
  /** array value metadata */
  key: KeyFunction

  // Hint: add new attribute callables in `ts/elements/elementFunctions.ts` and mirror them here.
  style: AttributeCallable
  id: AttributeCallable
  class: AttributeCallable
  href: AttributeCallable
  value: AttributeCallable
  placeholder: AttributeCallable
  minLength: AttributeCallable
  maxLength: AttributeCallable
  src: AttributeCallable
  type: AttributeCallable
  title: AttributeCallable
  disabled: AttributeCallable
  checked: AttributeCallable
  selected: AttributeCallable
  
  cellPadding: AttributeCallable
  cellSpacing: AttributeCallable
  border: AttributeCallable
  
  // any other attribute
  attr: (
    nameOrValue: AttrValue,
    value?: AttrValue,
  ) => ElementFunction,

  attrs: (nameValuePairs: {
    [name: string]: AttrValue
  }) => ElementFunction,

  contextMenu: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onClick: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onChange: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onInput: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onKeyup: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onKeydown: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onMouseover: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onMouseout: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
}

// type HtmlBasic = (() => TagJsComponent<any>) | void | Date | string | boolean | TagJsTag | number | null | undefined
type HtmlBasic = void | Date | string | boolean | TagJsTag | number | null | undefined

export type ToHtmlItem = ((_: InputElementTargetEvent) => (HtmlItem | HtmlItem[] | TagJsComponent<any> | TagJsComponent<any>[]))
export type HtmlItem = /*(
  (_: InputElementTargetEvent) => Tag | HtmlBasic | (Tag | HtmlBasic)[]
) | */HtmlBasic | any[] // object

export type AttrValue = string | number | boolean | undefined | ((context: ContextItem) => any)

export type TagChildContent =  HtmlItem[] | HtmlItem | ToHtmlItem | ((_: InputElementTargetEvent) => HtmlBasic | TagJsComponent<any>)

export type ElementFunction = (
  (
    attributesOrFirstChild: TagChildContent | Attributes,
    ...children: TagChildContent[]
  // ) => TagJsComponent<any> // | any[] //| ElementFunction // TagJsTag // CombinedElementFunctions
  ) => ElementFunction & CombinedElementFunctions
  // ) => TagJsTag
) & CombinedElementFunctions
