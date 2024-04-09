import { InsertBefore } from "./Clones.type"

// Function to update the value of x
export function updateBeforeTemplate(
  value: string | undefined | boolean | number,
  lastFirstChild: InsertBefore,
) {
  const parent = lastFirstChild.parentNode as ParentNode
  
  // mimic React skipping to display EXCEPT for true does display on page
  if(value === undefined || value === false || value === null) { // || value === true
    value = ''
  }

  // Insert the new value (never use innerHTML here)
  const textNode = document.createTextNode(value as string) // never innerHTML
  parent.insertBefore(textNode, lastFirstChild)

  /* remove existing nodes */
  parent.removeChild(lastFirstChild)
  
  return textNode
}
