import { AnySupport } from '../tag/index.js'
import { renderExistingSupport } from'./renderExistingTag.function.js'
import { ValueTypes } from '../tag/ValueTypes.enum.js'
import {SupportTagGlobal, TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { getSupportWithState } from '../interpolations/attributes/getSupportWithState.function.js'

export function isInlineHtml(templater: TemplaterResult) {
  return ValueTypes.templater === templater.tagJsType
}

/** Main function used by all other callers to render/update display of a tag component */
export function renderSupport<T extends AnySupport>(
  support: T, // must be latest/newest state render
): T {
  const subject = support.context
  const global = subject.global as SupportTagGlobal
  const templater = support.templater
  const inlineHtml = isInlineHtml(templater)

  if(subject.locked) {
    global.blocked.push(support)
    return support
  }

  // is it just a vanilla tag, not component?
  if( inlineHtml ) {
    const result = renderInlineHtml(support) as T
    return result
  }

  subject.locked = 4

  if(global.blocked.length) {
    support = global.blocked.pop() as T
    global.blocked = []
  }

  const tag = renderExistingSupport(
    subject.state.newest as AnySupport,
    support,
    subject,
  )

  delete subject.locked

  return tag as T
}

/** Renders the owner of the inline HTML even if the owner itself is inline html */
export function renderInlineHtml(
  support: AnySupport,
) {
  const ownerSupport = getSupportWithState(support)
  const ownContext = ownerSupport.context
  const newest = ownContext.state.newest

  // Function below may call renderInlineHtml again if owner is just inline HTML
  const result = renderSupport(newest as AnySupport)

  return result
}

