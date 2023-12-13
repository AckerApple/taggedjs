import { Tag } from "./Tag.class.js"
import { interpolateElement } from "./interpolateElement.js"

export function buildItemTagMap(
  /** @type {Tag} */ tag,
  template, // {string, context}
  insertBefore,
  counts, // {removed:0, added:0}
) {
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
  temporary,
  insertBefore,
  counts, // {removed:0, added:0}
) {
  const clones = []
  const templateClone = temporary.children[0]
  const sibling = templateClone // a div we added
  let nextSibling = sibling.nextSibling
  temporary.removeChild(templateClone) // remove the div
  
  while (nextSibling) {
    const nextNextSibling = nextSibling.nextSibling
    buildSibling(nextSibling, temporary, insertBefore, counts)
    clones.push(nextSibling)
    nextSibling = nextNextSibling
  }

  return clones
}

function buildSibling(
  nextSibling,
  temporary,
  insertBefore,
  counts, // {removed:0, added:0}
) {
  // temporary.removeChild(nextSibling) // is auto moved
  insertBefore.parentNode.insertBefore(nextSibling, insertBefore)  

  /*if(nextSibling.getAttribute) {
    elementInitCheck(nextSibling, counts)
  }*/
}

export function elementInitCheck(nextSibling, counts) {
  const onInitDoubleWrap = nextSibling.oninit // nextSibling.getAttribute('oninit')
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