import { BaseTagSupport, TagSupport } from '../TagSupport.class.js'
import { deepEqual } from '../../deepFunctions.js'
import { renderExistingTag } from'./renderExistingTag.function.js'
import { Props } from '../../Props.js'

/** Main function used by all other callers to render/update display of a tag component */
export function renderTagSupport(
  tagSupport: TagSupport | BaseTagSupport, // must be latest/newest state render
  renderUp: boolean,
): TagSupport | BaseTagSupport {
  const global = tagSupport.global
  const templater = tagSupport.templater

  // is it just a vanilla tag, not component?
  if( !templater.wrapper ) {// || isTagTemplater(templater) 
    const ownerTag = (tagSupport as TagSupport).ownerTagSupport
    ++global.renderCount
    if(ownerTag.global.deleted) {
      return tagSupport
    }
    return renderTagSupport(ownerTag.global.newest as TagSupport, true)
  }

  const subject = tagSupport.subject
  const oldest = tagSupport.global.oldest
  
  let ownerSupport: undefined | TagSupport
  let selfPropChange = false
  const shouldRenderUp = renderUp && tagSupport

  if(shouldRenderUp) {
    ownerSupport = (tagSupport as TagSupport).ownerTagSupport
    if(ownerSupport) {
      const nowProps = templater.props as Props
      const latestProps = tagSupport.propsConfig.latestCloned
      selfPropChange = !deepEqual(nowProps, latestProps)
    }
  }

  const tag = renderExistingTag(
    oldest,
    tagSupport,
    ownerSupport as TagSupport, // useTagSupport,
    subject,
  )
  
  if(ownerSupport && selfPropChange) {
    const ownerTagSupport = ownerSupport.global.newest as TagSupport
    renderTagSupport(
      ownerTagSupport,
      true,
    )

    return tag
  }

  return tag
}
