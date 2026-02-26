import { KeyFunction, TagJsComponent } from '../index.js'
import { ContextItem } from '../tag/ContextItem.type.js'
import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { TagJsTag } from '../TagJsTags/TagJsTag.type.js'
import type { AttributeCallable } from './attributeCallables.js'
import { ElementVarBase } from './ElementVarBase.type.js'

export type CombinedElementFunctions = ElementVarBase & {
  /** array value metadata */
  key: KeyFunction

  // Hint: add new attribute callables in `ts/elements/elementFunctions.ts` and mirror them here.
  style: AttributeCallable
  id: AttributeCallable
  class: AttributeCallable
  
  lang: AttributeCallable
  content: AttributeCallable
  charset: AttributeCallable
  rel: AttributeCallable
  valign: AttributeCallable
  
  href: AttributeCallable
  value: AttributeCallable
  placeholder: AttributeCallable
  minLength: AttributeCallable
  maxLength: AttributeCallable
  min: AttributeCallable
  max: AttributeCallable
  step: AttributeCallable
  name: AttributeCallable
  wrap: AttributeCallable
  target: AttributeCallable
  src: AttributeCallable
  rows: AttributeCallable
  type: AttributeCallable
  title: AttributeCallable
  alt: AttributeCallable
  width: AttributeCallable
  height: AttributeCallable
  for: AttributeCallable
  disabled: AttributeCallable
  checked: AttributeCallable
  selected: AttributeCallable
  
  cellPadding: AttributeCallable
  cellSpacing: AttributeCallable
  autoFocus: AttributeCallable
  border: AttributeCallable
  
  //svg
  viewBox: AttributeCallable
  fill: AttributeCallable
  
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
  onDoubleClick: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onDblClick: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onBlur: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onChange: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onInput: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  
  onKeyUp: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onKeyDown: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  
  onMouseOver: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onMouseOut: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onMouseUp: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onMouseDown: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
  onClose: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
}

// type HtmlBasic = (() => TagJsComponent<any>) | void | Date | string | boolean | TagJsTag | number | null | undefined
type HtmlBasic = void | Date | string | boolean | TagJsTag<any> | number | null | undefined

export type ToHtmlItem = ((_: InputElementTargetEvent) => (HtmlItem | HtmlItem[] | TagJsComponent<any> | TagJsComponent<any>[]))
export type HtmlItem = /*(
  (_: InputElementTargetEvent) => Tag | HtmlBasic | (Tag | HtmlBasic)[]
) | */HtmlBasic | any[] // object

export type AttrValue = string | number | boolean | undefined | ((context: ContextItem) => any)

export type TagChildContent =  HtmlItem[] | HtmlItem | ToHtmlItem | ((_: InputElementTargetEvent) => HtmlBasic | TagJsComponent<any>)

export type ElementFunction = (
  (
    ...children: TagChildContent[]
  ) => ElementFunction & CombinedElementFunctions
  // ) => TagJsTag
) & CombinedElementFunctions
