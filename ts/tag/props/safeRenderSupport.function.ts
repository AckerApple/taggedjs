import { isInlineHtml, renderInlineHtml } from '../../render/renderSupport.function.js'
import { renderExistingSupport } from '../../render/renderExistingTag.function.js'
import { AnySupport } from '../AnySupport.type.js'

export function safeRenderSupport(
  newest: AnySupport,
) {
  const subject = newest.subject
  const isInline = isInlineHtml(newest.templater)
  if( isInline ) {
    return renderInlineHtml(newest)
  }

  return renderExistingSupport(
    newest,
    newest,
    subject,
  )
}
