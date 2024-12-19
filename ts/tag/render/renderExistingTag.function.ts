import { AnySupport,SupportContextItem } from '../getSupport.function.js'
import { renderWithSupport } from'./renderWithSupport.function.js'
import { processTag } from '../update/processTag.function.js'
import { updateSupportBy } from '../updateSupportBy.function.js'
import { Counts } from '../../interpolations/interpolateTemplate.js'

const fooCounts: Counts = { added:0, removed:0 }

// TODO: This function is being called for 1st time renders WHEN renderCount === 1
export function renderExistingReadyTag(
  lastSupport: AnySupport,
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
    fooCounts,
  )

  return support
}
