import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { renderWithSupport } from'./renderWithSupport.function.js'
import { ContextItem } from '../Context.types.js'
import { processTag } from '../update/processTag.function.js'
import { updateSupportBy } from '../updateSupportBy.function.js'
import { SupportTagGlobal } from '../TemplaterResult.class.js'

export function renderExistingReadyTag(
  lastSupport: AnySupport,
  newSupport: AnySupport, // new to be rendered
  ownerSupport: BaseSupport | Support, // ownerSupport
  subject: ContextItem, 
) {
  const global = subject.global as SupportTagGlobal

  const {support, wasLikeTags} = renderWithSupport(
    newSupport,
    lastSupport,
    subject,
    ownerSupport as Support,
  )
  
  if( wasLikeTags ) {
    updateSupportBy(global.oldest, support)
    // updateSupportValuesBy(oldest, support)
    // paint()
    return support
  }

  processTag(
    ownerSupport,
    subject,
  )

  return support
  
}
