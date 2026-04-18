import { TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { TagMaker } from '../tag/TagMaker.type.js'
import { AnySupport, TagGlobal } from '../index.js'
import { processReplacementComponent } from '../tag/update/processFirstSubjectComponent.function.js'

/** Only called by renderTagElement */
export function registerTagElement(
  support: AnySupport,
  _element: Element | HTMLElement,
  _global: TagGlobal, // TODO: remove
  _templater: TemplaterResult,
  _app: TagMaker,
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
