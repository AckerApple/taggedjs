import { AnySupport } from '../tag/index.js'
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

  if( result.wasLikeTags ) {
    const oldest = subject.state.oldest as AnySupport // || result.support
    updateSupportBy(oldest, result.support)
    return result.support
  }

  return processTag(
    newSupport,
    subject,
  )
}
