import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { setUse } from'../../state/index.js'
import { Counts } from'../../interpolations/interpolateTemplate.js'
import { processTagResult } from'./processTagResult.function.js'
import { TagSubject } from '../../subject.types.js'
import { BaseSupport, Support } from '../Support.class.js'
import { InsertBefore } from'../../interpolations/InsertBefore.type.js'
import { renderSubjectComponent } from'../render/renderSubjectComponent.function.js'
import { setupNewSupport } from './processTag.function.js'

/** create new support, connects globals to old support if one, and  */
export function processSubjectComponent(
  templater: TemplaterResult,
  subject: TagSubject,
  insertBefore: InsertBefore,
  ownerSupport: Support,
  options: {counts: Counts},
  fragment ?: DocumentFragment,
): BaseSupport | Support {
  // Check if function component is wrapped in a tag() call
  // TODO: This below check not needed in production mode
  if(templater.tagged !== true) {
    const wrapper = templater.wrapper as Wrapper
    const original = wrapper.parentWrap.original
    let name: string | undefined = original.name || original.constructor?.name

    if(name === 'Function') {
      name = undefined
    }

    const label = name || original.toString().substring(0,120)
    const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`)
    throw error
  }

  const support = new Support(
    templater,
    ownerSupport,
    subject,
  )
  
  let reSupport = subject.support
  setupNewSupport(support, ownerSupport, subject)
  const global = support.subject.global = reSupport?.subject.global || support.subject.global
  global.oldest = support
  global.insertBefore = insertBefore
  
  const isRender = !reSupport
  if(isRender) {    
    const mySupport = reSupport || support
    reSupport = renderSubjectComponent(
      subject,
      mySupport,
      ownerSupport,
    )
  }

  const newSupport = processTagResult(
    reSupport,
    subject, // The element set here will be removed from document. Also result.tag will be added in here
    options,
    fragment,
  )

  // subject.support = newSupport
  ownerSupport.subject.global.childTags.push(newSupport as Support)

  return reSupport
}

