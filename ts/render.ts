import { InsertBefore } from "./Clones.type"

export function buildClones(
  temporary: Element,
  insertBefore: InsertBefore,
) {
  const clones = []
  const template = temporary.children[0] as HTMLTemplateElement
  let nextSibling = template.content.firstChild
  
  while (nextSibling) {
    const nextNextSibling = nextSibling.nextSibling
    buildSibling(nextSibling, insertBefore)
    clones.push(nextSibling)
    nextSibling = nextNextSibling
  }

  return clones
}

function buildSibling(
  nextSibling: ChildNode,
  insertBefore: InsertBefore,
) {
  const parentNode = insertBefore.parentNode as ParentNode
  parentNode.insertBefore(
    nextSibling,
    insertBefore
  )
}
