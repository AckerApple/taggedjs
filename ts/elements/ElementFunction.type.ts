import { InputElementTargetEvent } from '../TagJsEvent.type.js'
import { TagJsVar } from '../tagJsVars/tagJsVar.type.js'
import type { AttributeCallable } from './attributeCallables.js'
import { Attributes, ElementVarBase } from './htmlTag.function'

type Child = ((_: InputElementTargetEvent) => any) | string | boolean | TagJsVar | number | null | undefined | any[] // object

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

  onClick: (callback: (e: InputElementTargetEvent) => any) => ElementFunction
}

export type ElementVar = ElementFunction // & ReturnType<typeof elementFunctions>
