import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { renderWithSupport } from'./renderWithSupport.function.js'
import { providersChangeCheck } from '../../state/providersChangeCheck.function.js'
import { ContextItem } from '../Tag.class.js'
import { TagSubject } from '../../subject.types.js'
import { processTag } from '../update/processTag.function.js'

/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
export function renderExistingTag(
  oldestSupport: AnySupport, // oldest with elements on html
  newSupport: AnySupport, // new to be rendered
  ownerSupport: BaseSupport | Support, // ownerSupport
  subject: ContextItem,
): AnySupport {
  const lastSupport = subject.support as Support // todo maybe not needed?
  const global = subject.global

  // share point between renders
  newSupport.subject.global = global

  const preRenderCount = global.renderCount
  providersChangeCheck(oldestSupport)
  
  // When the providers were checked, a render to myself occurred and I do not need to re-render again
  const prevSupport = global.newest as Support
  const justUpdate = preRenderCount !== global.renderCount
  if(justUpdate) {
    oldestSupport.subject.global.oldest.updateBy(prevSupport)
    return prevSupport // already rendered during triggered events
  }

  const toRedrawTag = prevSupport || lastSupport || global.oldest
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
