import { InsertBefore } from'./interpolations/InsertBefore.type.js'

// Function to insert element after reference element
export function insertAfter(
  newNode: InsertBefore,
  referenceNode: InsertBefore
) {
  const parentNode = referenceNode.parentNode as ParentNode
  parentNode.insertBefore(newNode, referenceNode.nextSibling)
}
