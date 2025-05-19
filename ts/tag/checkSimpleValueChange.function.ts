// Functions in here are attached as ContextItem.checkValueChange

import { processUpdateRegularValue, RegularValue } from './update/processRegularValue.function.js'
import { BasicTypes } from './ValueTypes.enum.js'
import { ContextItem } from './Context.types.js'
import { paintCommands, paintRemover } from '../render/paint.function.js'

export function checkSimpleValueChange(
  newValue: unknown,
  contextItem: ContextItem,
) {
  const isBadValue = newValue === null || newValue === undefined
  if(isBadValue || !(typeof(newValue) === BasicTypes.object)) {
    // This will cause all other values to render
    processUpdateRegularValue(
      newValue as RegularValue,
      contextItem,
    )

    return -1  // no need to destroy, just update display
  }

  deleteSimpleValue(contextItem)
  
  return 6 // 'changed-simple-value'
}

export function deleteSimpleValue(
  contextItem: ContextItem,
) {
  const elm = contextItem.simpleValueElm as Element
  
  delete contextItem.simpleValueElm
  delete (contextItem as any).checkValueChange

  if(!elm) {
    throw new Error('how does this happen?')
  }

  paintCommands.push({
    processor: paintRemover,
    args: [elm],
  })
}
