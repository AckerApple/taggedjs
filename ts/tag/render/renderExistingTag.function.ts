import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { renderWithSupport } from'./renderWithSupport.function.js'
import { providersChangeCheck } from '../../state/providersChangeCheck.function.js'
import { ContextItem } from '../Tag.class.js'
import { TagSubject } from '../../subject.types.js'
import { processTag } from '../update/processTag.function.js'
import { painting } from '../paint.function.js'

/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
export function renderExistingTag(
  oldestSupport: AnySupport, // oldest with elements on html
  newSupport: AnySupport, // new to be rendered
  ownerSupport: BaseSupport | Support, // ownerSupport
  subject: ContextItem,
): AnySupport {
  const lastSupport = subject.support as Support // todo maybe not needed?
  const global = subject.global
  const prevSupport = global.newest as Support

  /*
  const preRenderCount = global.renderCount
  providersChangeCheck(oldestSupport)
  
  // When the providers were checked, a render to myself occurred and I do not need to re-render again
  const justUpdate = preRenderCount !== global.renderCount

  if(justUpdate) {
    oldestSupport.subject.global.oldest.updateBy(prevSupport)
    return prevSupport // already rendered during triggered events
  }
  */
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
    subject as TagSubject,
    ownerSupport as Support,
  )
  
  const updateAfterRender = prevSupport && wasLikeTags
  if(updateAfterRender) {
    subject.support = support as Support
    const oldest = global.oldest || oldestSupport
    oldest.updateBy(support)
    return support
  }

  processTag(
    support.templater,
    ownerSupport,
    subject as TagSubject,
  )

  return support
  
}