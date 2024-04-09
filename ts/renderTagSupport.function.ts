import { Tag } from './Tag.class'
import { BaseTagSupport, TagSupport } from './TagSupport.class'
import { deepEqual } from './deepFunctions'
import { isTagInstance } from './isInstance'
import { renderExistingTag } from './renderExistingTag.function'

/** Main function used by all other callers to render/update display of a tag component */
export function renderTagSupport(
  tagSupport: BaseTagSupport,
  renderUp: boolean,
): Tag {
  const global = tagSupport.templater.global
  if(isTagInstance(tagSupport.templater)) {
    const newTag = global.newest as Tag
    const ownerTag = newTag.ownerTag as Tag
    ++global.renderCount
    return renderTagSupport(ownerTag.tagSupport, true)
  }

  // const oldTagSetup = this
  const subject = tagSupport.subject
  const templater = tagSupport.templater // oldTagSetup.templater // templater
  const subjectTag = subject.tag
  const newest = subjectTag?.tagSupport.templater.global.newest as Tag
  let ownerTag: undefined | Tag
  let selfPropChange = false
  const shouldRenderUp = renderUp && newest

  if(shouldRenderUp) {
    ownerTag = newest.ownerTag
    
    if(ownerTag) {
      const nowProps = templater.props as any
      const latestProps = newest.tagSupport.propsConfig.latestCloned

      selfPropChange = !deepEqual(nowProps, latestProps)
    }
  }

  const useTagSupport = global.newest?.tagSupport as TagSupport // oldTagSetup

  if(!templater.global.oldest) {
    throw new Error('already causing trouble')
  }

  const tag = renderExistingTag(
    templater.global.oldest as Tag,
    templater,
    useTagSupport,
    subject,
  )

  const renderOwner = ownerTag && selfPropChange
  if(renderOwner) {
    const ownerTagSupport = (ownerTag as Tag).tagSupport
    renderTagSupport(
      ownerTagSupport,
      true,
    )

    return tag
  }

  return tag
}
