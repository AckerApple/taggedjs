import { TemplaterResult } from '../TemplaterResult.class.js'
import { Counts } from'../../interpolations/interpolateTemplate.js'
import { processFirstTagResult, processTagResult } from'./processTagResult.function.js'
import { TagSubject } from '../../subject.types.js'
import { BaseSupport, Support } from '../Support.class.js'
import { setupNewSupport } from './processTag.function.js'
import { renderWithSupport } from '../render/renderWithSupport.function.js'
import { ContextItem } from '../Tag.class.js'
import { validateTemplater } from './validateTemplater.function.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { getCastedProps } from '../getTagWrap.function.js'

export function processFirstSubjectComponent(
  templater: TemplaterResult,
  subject: ContextItem,
  ownerSupport: BaseSupport | Support,
  options: {counts: Counts},
): BaseSupport | Support {
  // TODO: This below check not needed in production mode
  validateTemplater(templater)

  const newSupport = new Support(
    templater,
    ownerSupport,
    subject,
  )

  const castedProps = templater.tagJsType !== ValueTypes.tagComponent ? [] : getCastedProps(
    templater,
    newSupport,
  )

  newSupport.propsConfig.castProps = castedProps
  
  setupNewSupport(newSupport, ownerSupport, subject)
  
  const {support} = renderWithSupport(
    newSupport,
    subject.global.newest, // subject.support, // existing tag
    subject as TagSubject,
    ownerSupport,
  )

  processFirstTagResult(
    support,
    options.counts,
    subject as TagSubject, // The element set here will be removed from document. Also result.tag will be added in here
  )

  ownerSupport.subject.global.childTags.push(newSupport as Support)

  return support
}
