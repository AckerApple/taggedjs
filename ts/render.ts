export function buildClones(
  temporary: Element,
  insertBefore: Element,
) {
  const clones = []
  const templateClone = temporary.children[0]

  /*
  if(!templateClone) {
    return []
  }
  */

  const sibling = templateClone // a div we added
  let nextSibling = sibling.nextSibling
  temporary.removeChild(templateClone) // remove the div
  
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
  insertBefore: Element,
) {
  const parentNode = insertBefore.parentNode as ParentNode
  parentNode.insertBefore(
    nextSibling,
    insertBefore
  )
}
