import { AnySupport } from '../tag/AnySupport.type.js'
import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { renderWithSupport } from'./renderWithSupport.function.js'
import { processTag } from './update/processTag.function.js'
import { updateSupportBy } from './update/updateSupportBy.function.js'

export function renderExistingSupport(
  lastSupport: AnySupport, // should be global.newest
  newSupport: AnySupport, // new to be rendered
  subject: SupportContextItem,
) {
  const result = renderWithSupport(
    newSupport,
    lastSupport,
    subject,
  )

  const global = subject.global
  // lastSupport !== newSupport && 
  if( result.wasLikeTags ) {
    updateSupportBy(global.oldest, result.support)
    return result.support
  }

  return processTag(
    newSupport,
    subject,
    { added: 0, removed: 0 },
  )
}
