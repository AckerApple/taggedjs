import { Context, Tag } from "./Tag.class.js"
import { interpolateElement } from "./interpolateElement.js"
import { Counts } from "./interpolateTemplate.js"

export function buildItemTagMap(
  tag: Tag,
  template: {string: string, context: Context}, // {string, context}
  insertBefore: Element,
  counts: Counts,
): (ChildNode | Element)[] {
  const temporary = document.createElement('div')
  temporary.id = 'tag-temp-holder'
  
  // render content with a first child that we can know is our first element
  temporary.innerHTML = '<div></div>' + template.string

  const context = tag.update()
  interpolateElement(temporary, context, tag)
  
  const clones = buildClones(temporary, insertBefore, counts)
  tag.clones.push( ...clones )

  return clones
}

function buildClones(
  temporary: Element,
  insertBefore: Element,
  counts: Counts,
) {
  const clones = []
  const templateClone = temporary.children[0]
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
  (insertBefore.parentNode as ParentNode).insertBefore(nextSibling, insertBefore)  

  /*if(nextSibling.getAttribute) {
    elementInitCheck(nextSibling, counts)
  }*/
}

/** TODO may be ready to remove this */
export function elementInitCheck(
  nextSibling: ChildNode,
  counts: Counts
) {
  const onInitDoubleWrap = (nextSibling as any).oninit // nextSibling.getAttribute('oninit')
  if(!onInitDoubleWrap) {
    return
  }

  const onInitWrap = onInitDoubleWrap.tagFunction
  if(!onInitWrap) {
    return
  }

  const onInit = onInitWrap.tagFunction
  if(!onInit) {
    return
  }

  const event = {target: nextSibling, stagger: counts.added}
  onInit(event)

  ++counts.added
}