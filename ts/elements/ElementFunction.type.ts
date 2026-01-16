import { ContextItem } from '../tag/ContextItem.type.js'
import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import type { AttributeCallable } from './attributeCallables.js'
import { Attributes, ElementVarBase } from './htmlTag.function'

type Child = ((_: InputElementTargetEvent) => any) | string | boolean | TagJsVar | number | null | undefined | any[] // object
export type AttrValue = string | number | boolean | undefined | ((context: ContextItem) => any)
export type ElementFunction = (
  (
    attributesOrFirstChild: Child | Attributes,
    ...children: Child[]
  ) => any
) & ElementVarBase & {
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

export type ElementVar = ElementFunction // & ReturnType<typeof elementFunctions>
