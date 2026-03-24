import { TemplaterResult } from '../tag/getTemplaterResult.function.js'
import {  TagWrapper } from '../tag/tag.utils.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import { TagMaker } from '../tag/TagMaker.type.js'
import { AnySupport, appElements, ContextItem, TagAppElement, TagGlobal, UseMemory, Wrapper } from '../index.js'
import { DomObjectChildren, DomObjectElement, DomObjectText } from '../interpolations/optimizers/ObjectNode.types.js'
import { processReplacementComponent } from '../tag/update/processFirstSubjectComponent.function.js'

/** Only called by renderTagElement */
export function registerTagElement(
  support: AnySupport,
  element: Element | HTMLElement,
  global: TagGlobal, // TODO: remove
  templater: TemplaterResult,
  app: TagMaker,
  placeholder: Text,
) {
  const context = support.context
  context.state.oldest = support
  context.state.newest = support
  
  // Copy newer to older when resetting
  context.state.older = context.state.newer


  context.contexts = context.contexts || []
  const newFragment = document.createDocumentFragment()
  newFragment.appendChild(placeholder)
  processReplacementComponent(
    support.templater,
    context,
    support,
  )

  return newFragment
}
