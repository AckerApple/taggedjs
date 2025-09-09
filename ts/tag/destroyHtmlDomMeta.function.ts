import { DomObjectChildren, DomObjectElement, DomObjectText } from '../interpolations/optimizers/ObjectNode.types.js'
import { addPaintRemover } from '../render/paint.function.js'

/** Destroy dom elements and dom space markers */
export function destroyHtmlDomMeta(
  htmlDomMeta: DomObjectChildren,
) {
  // check subjects that may have clones attached to them
  for (let index = htmlDomMeta.length - 1; index >= 0; --index) {
	  const clone = htmlDomMeta[index]
    destroyClone(clone)
    htmlDomMeta.splice(index, 1)
  }
}

function destroyClone(
  clone: DomObjectText | DomObjectElement
) {
    const marker = clone.marker
    if(marker) {
      addPaintRemover(marker, 'destroyMarker')
    }

    const dom = clone.domElement
    addPaintRemover(dom, 'destroyClone')
}
