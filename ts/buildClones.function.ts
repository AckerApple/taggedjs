import { Template } from "./interpolations/interpolateTemplate"

export function buildClones(
  fragment: DocumentFragment,
  template: Template,
) {
  const clones: ChildNode[] = []
  let nextSibling = template.content.firstChild
    
  while (nextSibling) {
    const nextNextSibling = nextSibling.nextSibling as ChildNode
    fragment.appendChild(nextSibling)
    clones.push(nextSibling)
    nextSibling = nextNextSibling
  }

  return clones
}
