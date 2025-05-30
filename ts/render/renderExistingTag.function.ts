import { AnySupport } from '../tag/AnySupport.type.js'
import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { renderWithSupport } from'./renderWithSupport.function.js'
import { processTag } from './update/processTag.function.js'
import { updateSupportBy } from './update/updateSupportBy.function.js'

// TODO: This function is being called for 1st time renders WHEN renderCount === 1
export function renderExistingReadyTag(
  lastSupport: AnySupport, // should be global.newest
  newSupport: AnySupport, // new to be rendered
  ownerSupport: AnySupport, // ownerSupport
  subject: SupportContextItem,
) {
  const global = subject.global
  const {support, wasLikeTags} = renderWithSupport(
    newSupport,
    lastSupport, // renderCount <= 0 ? undefined : lastSupport
    subject,
    ownerSupport as AnySupport,
  )

  if( wasLikeTags ) {
    updateSupportBy(global.oldest, support)
    return support
  }

  processTag(
    ownerSupport,
    subject,
    { added: 0, removed: 0 },
  )

  return support
}
