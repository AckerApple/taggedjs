import { TagSupport } from './TagSupport.class'
import { deepEqual } from './deepFunctions'
import { renderExistingTag } from './renderExistingTag.function'

/** Main function used by all other callers to render/update display of a tag component */
export function renderTagSupport(
  tagSupport: TagSupport, // must be latest/newest state render
  renderUp: boolean,
): TagSupport {
  const global = tagSupport.global
  const templater = tagSupport.templater
  
  // is it just a vanilla tag, not component?
  
  if( !templater.wrapper ) {// || isTagTemplater(templater) 
    const ownerTag = tagSupport.ownerTagSupport as TagSupport
    ++global.renderCount
    return renderTagSupport(ownerTag, true)
  }

  const subject = tagSupport.subject
  
  let ownerSupport: undefined | TagSupport
  let selfPropChange = false
  const shouldRenderUp = renderUp && tagSupport

  if(shouldRenderUp) {
    ownerSupport = tagSupport.ownerTagSupport
    if(ownerSupport) {
      const nowProps = templater.props as any
      const latestProps = tagSupport.propsConfig.latestCloned
      selfPropChange = !deepEqual(nowProps, latestProps)
    }
  }

  const oldest = tagSupport.global.oldest as TagSupport
  const tag = renderExistingTag(
    oldest,
    tagSupport,
    ownerSupport as TagSupport, // useTagSupport,
    subject,
  )

  const renderOwner = ownerSupport && selfPropChange
  if(renderOwner) {  
    const ownerTagSupport = ownerSupport as TagSupport
    
    renderTagSupport(
      ownerTagSupport,
      true,
    )

    return tag
  }

  return tag
}
