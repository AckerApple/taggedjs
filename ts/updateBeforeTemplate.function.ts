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
export function castTextValue(value: TextableValue) {
  switch (value) {
    case undefined:
    case false:
    case null:
      return empty
  }

  return value as string;
}
