import { InsertBefore } from "./interpolations/Clones.type"
import { NoDisplayValue } from "./interpolations/processAttribute.function"

// Function to update the value of x
export function updateBeforeTemplate(
  value: string, // value should be casted before calling here
  lastFirstChild: InsertBefore,
) {
  const parent = lastFirstChild.parentNode as ParentNode

  // Insert the new value (never use innerHTML here)
  const textNode = document.createTextNode(value) // never innerHTML
  parent.insertBefore(textNode, lastFirstChild)

  /* remove existing nodes */
  parent.removeChild(lastFirstChild)

  return textNode
}

type TextableValue = string | boolean | number | NoDisplayValue

export function castTextValue(
  value: TextableValue
) {
  // mimic React skipping to display EXCEPT for true does display on page
  if([undefined,false,null].includes(value as NoDisplayValue)) { // || value === true
    return ''
  }

  return value as string
}