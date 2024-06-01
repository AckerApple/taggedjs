import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { setUse } from'../../state/index.js'
import { Counts } from'../../interpolations/interpolateTemplate.js'
import { processTagResult } from'./processTagResult.function.js'
import { TagSubject } from '../../subject.types.js'
import { BaseTagSupport, TagSupport } from '../TagSupport.class.js'
import { InsertBefore } from'../../interpolations/InsertBefore.type.js'
import { renderSubjectComponent } from'../render/renderSubjectComponent.function.js'

export function processSubjectComponent(
  templater: TemplaterResult,
  subject: TagSubject,
  insertBefore: InsertBefore,
  ownerSupport: TagSupport,
  options: {counts: Counts},
): BaseTagSupport | TagSupport {
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

  const tagSupport = new TagSupport(
    templater,
    ownerSupport,
    subject,
  )

  let reSupport = subject.tagSupport
  const global = tagSupport.global = reSupport?.global || tagSupport.global
  global.insertBefore = insertBefore
  
  const providers = setUse.memory.providerConfig
  providers.ownerSupport = ownerSupport
  
  const isRender = !reSupport
  if(isRender) {
    const support = reSupport || tagSupport
    reSupport = renderSubjectComponent(
      subject,
      support,
      ownerSupport,
    )
  }

  processTagResult(
    reSupport,
    subject, // The element set here will be removed from document. Also result.tag will be added in here
    insertBefore, // <template end interpolate /> (will be removed)
    options,
  )

  return reSupport
}

