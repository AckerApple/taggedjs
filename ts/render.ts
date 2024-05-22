import { InsertBefore } from "./interpolations/Clones.type"

export function buildClones(
  temporary: Element,
  insertBefore: InsertBefore,
) {
  const clones = []
  const template = temporary.children[0] as HTMLTemplateElement
  let nextSibling = template.content.firstChild
  const fragment = document.createDocumentFragment()
    
  while (nextSibling) {
    const nextNextSibling = nextSibling.nextSibling as ChildNode
    clones.push(nextSibling)
    fragment.appendChild(nextSibling)
    nextSibling = nextNextSibling
  }

  if(insertBefore.parentNode) {
    const parentNode = insertBefore.parentNode as ParentNode
    parentNode.insertBefore(fragment, insertBefore)
  }

  return clones
}
