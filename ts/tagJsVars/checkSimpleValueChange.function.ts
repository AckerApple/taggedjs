import { BasicTypes, ContextItem, deleteSimpleValue } from "../index.js"
import { processUpdateRegularValue, RegularValue } from "../tag/update/processRegularValue.function.js"

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
