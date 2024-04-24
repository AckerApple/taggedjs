import { InsertBefore } from "./Clones.type"
import { NoDisplayValue } from "./interpolations/processAttribute.function"
import { isTagClass, isTagTemplater } from "./isInstance"

// Function to update the value of x
export function updateBeforeTemplate(
  value: string | boolean | number | NoDisplayValue,
  lastFirstChild: InsertBefore,
) {
  const parent = lastFirstChild.parentNode as ParentNode
  let castedValue = value as string
  
  // mimic React skipping to display EXCEPT for true does display on page
  if([undefined,false,null].includes(value as NoDisplayValue)) { // || value === true
    castedValue = ''
  }

  // Insert the new value (never use innerHTML here)
  const textNode = document.createTextNode(castedValue) // never innerHTML
  parent.insertBefore(textNode, lastFirstChild)

  /* remove existing nodes */
  parent.removeChild(lastFirstChild)

  return textNode
}
