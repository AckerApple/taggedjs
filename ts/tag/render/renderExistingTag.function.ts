import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { renderWithSupport } from'./renderWithSupport.function.js'
import { ContextItem } from '../Tag.class.js'
import { processTag } from '../update/processTag.function.js'
import { updateSupportBy } from '../updateSupportBy.function.js'

/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
export function renderExistingTag(
  oldestSupport: AnySupport, // oldest with elements on html
  newSupport: AnySupport, // new to be rendered
  ownerSupport: BaseSupport | Support, // ownerSupport
  subject: ContextItem,
): AnySupport {
  const global = subject.global
  const lastSupport = global.newest as Support // todo maybe not needed?
  const prevSupport = global.newest as Support

  return renderExistingReadyTag(
    lastSupport,
    oldestSupport,
    newSupport,
    ownerSupport,
    subject,
    prevSupport,
  )
}

export function renderExistingReadyTag(
  lastSupport: AnySupport,
  oldestSupport: AnySupport, // oldest with elements on html
  newSupport: AnySupport, // new to be rendered
  ownerSupport: BaseSupport | Support, // ownerSupport
  subject: ContextItem, 
  prevSupport?: AnySupport,
) {
  const global = subject.global

  // ??? new end of string removed
  const toRedrawTag = prevSupport || lastSupport // || global.oldest
  const {support, wasLikeTags} = renderWithSupport(
    newSupport,
    toRedrawTag,
    subject,
    ownerSupport as Support,
  )
  
  const updateAfterRender = prevSupport && wasLikeTags
  if(updateAfterRender) {
    const oldest = global.oldest || oldestSupport
    updateSupportBy(oldest, support)
    return support
  }

  processTag(
    ownerSupport,
    subject,
  )

  return support
  
}
