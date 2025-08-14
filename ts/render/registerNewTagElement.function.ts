import { TemplaterResult } from '../tag/getTemplaterResult.function.js'
import {  TagWrapper } from '../tag/tag.utils.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { TagMaker } from '../tag/TagMaker.type.js'
import { AnySupport, appElements, BaseTagGlobal, buildBeforeElement, TagAppElement, UseMemory, Wrapper } from '../index.js'
import { DomObjectElement, DomObjectText } from '../interpolations/optimizers/ObjectNode.types.js'

export function registerTagElement(
  support: AnySupport,
  element: Element | HTMLElement,
  global: BaseTagGlobal,
  templater: TemplaterResult,
  app: TagMaker,
  placeholder: Text,
) {
  console.debug('🏷️ Building element into tag...', {element, app, support})
  const result = buildBeforeElement(
    support,
    element,
    undefined,
  )

  const subject = support.context
  subject.state.oldest = support
  subject.state.newest = support
  
  // Copy newer to older when resetting
  subject.state.older = subject.state.newer

  let setUse = (templater as unknown as TagAppElement).setUse

  if (templater.tagJsType !== ValueTypes.stateRender) {
    const wrap = app as unknown as Wrapper
    const original = (wrap as unknown as TagWrapper<unknown>).original
    setUse = original.setUse as unknown as UseMemory; (original as any).isApp = true
  }

  ;(element as TagAppElement).setUse = setUse; (element as TagAppElement).ValueTypes = ValueTypes
  appElements.push({ element, support })

  const newFragment = document.createDocumentFragment()
  newFragment.appendChild(placeholder)

  for (const domItem of result.dom) {
    putOneDomDown(domItem, newFragment)
  }

  console.debug('🏷️ Element Tag DOM built ✅')

  return newFragment
}

function putOneDomDown(
  dom: DomObjectText | DomObjectElement,
  newFragment: DocumentFragment,
) {
  if(dom.domElement) {
    newFragment.appendChild(dom.domElement)
  }
  if(dom.marker) {
    newFragment.appendChild(dom.marker)
  }
}
