import { InsertBefore } from "./Clones.type"

// Function to insert element after reference element
export function insertAfter(
  newNode: InsertBefore,
  referenceNode: InsertBefore
) {
  const parentNode = referenceNode.parentNode as ParentNode
  parentNode.insertBefore(newNode, referenceNode.nextSibling)
}
