import { NoDisplayValue } from'./interpolations/attributes/processAttribute.function.js'
import { paintInsertBefores } from './tag/paint.function.js'
import { empty } from './tag/ValueTypes.enum.js'

// Function to update the value of x
export function updateBeforeTemplate(
  value: string, // value should be casted before calling here
  lastFirstChild: Text,
) {
  const textNode = document.createTextNode(value) // never innerHTML

  paintInsertBefores.push({
    element: textNode,
    relative: lastFirstChild,
  })

  return textNode
}

type TextableValue = string | boolean | number | NoDisplayValue
const negatives = [undefined,false,null]
export function castTextValue(
  value: TextableValue
) {
  // mimic React skipping to display EXCEPT for true does display on page
  if(negatives.includes(value as NoDisplayValue)) { // || value === true
    return empty
  }

  return value as string
}
