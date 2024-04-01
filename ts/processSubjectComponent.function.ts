import { TemplaterResult, renderWithSupport } from './TemplaterResult.class'
import { setUse } from './setUse.function'
import { Counts, Template } from './interpolateTemplate'
import { Tag } from './Tag.class'
import { processTagResult } from './processTagResult.function'
import { TagSubject } from './Tag.utils'
import { TagSupport } from './TagSupport.class'

export function processSubjectComponent(
  templater: TemplaterResult,
  subject: TagSubject,
  template: Element | Text | Template,
  ownerTag: Tag,
  options: {counts: Counts, forceElement?: boolean},
) {
  // Check if function component is wrapped in a tag() call
  // TODO: This below check not needed in production mode
  if(templater.tagged !== true) {
    let name: string | undefined = templater.wrapper.original.name || templater.wrapper.original.constructor?.name

    if(name === 'Function') {
      name = undefined
    }

    const label = name || templater.wrapper.original.toString().substring(0,120)
    const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`)
    throw error
  }

  if(!templater.tagSupport) {
    templater.tagSupport = new TagSupport(
      ownerTag.tagSupport,
      templater,
      subject,
    )
  }

  // templater.oldest = subject.tag?.tagSupport.oldest || templater.oldest
  templater.global.insertBefore = template
  let retag = subject.tag
  
  const providers = setUse.memory.providerConfig
  providers.ownerTag = ownerTag
  
  const isRedraw = !retag || options.forceElement
  if(isRedraw) {
    const preClones = ownerTag.clones.map(clone => clone)
    retag = renderWithSupport(
      templater.tagSupport,
      subject.tag,
      subject,
      ownerTag,
    )

    if(retag.tagSupport.templater.global.newest != retag) {
      throw new Error('mismatch result newest')
    }

    templater.global.newest = retag

    if(ownerTag.clones.length > preClones.length) {
      const myClones = ownerTag.clones.filter(fClone => !preClones.find(clone => clone === fClone))
      retag.clones.push(...myClones)
    }
    
    ownerTag.childTags.push(retag)
  }

  processTagResult(
    retag,
    subject, // The element set here will be removed from document. Also result.tag will be added in here
    template, // <template end interpolate /> (will be removed)
    options,
  )
}
