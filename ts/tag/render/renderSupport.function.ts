import { AnySupport, BaseSupport, Support } from '../Support.class.js'
import { deepEqual } from '../../deepFunctions.js'
import { renderExistingTag } from'./renderExistingTag.function.js'
import { Props } from '../../Props.js'

/** Main function used by all other callers to render/update display of a tag component */
export function renderSupport<T extends Support | BaseSupport>(
  support: T, // must be latest/newest state render
  renderUp: boolean,
): T {
  const global = support.subject.global
  const templater = support.templater

  // is it just a vanilla tag, not component?
  if( !templater.wrapper ) {// || isTagTemplater(templater) 
    const ownerTag = (support as Support).ownerSupport
    ++global.renderCount
    if(ownerTag.subject.global.deleted) {
      return support
    }
    return renderSupport(ownerTag.subject.global.newest as Support, true) as T
  }

  if(support.subject.global.locked) {
    support.subject.global.blocked.push(support)
    return support
  }

  const subject = support.subject
  const oldest = support.subject.global.oldest
  
  let ownerSupport: undefined | AnySupport
  let selfPropChange = false
  const shouldRenderUp = renderUp && support

  if(shouldRenderUp) {
    ownerSupport = (support as Support).ownerSupport
    if(ownerSupport) {
      const nowProps = templater.props as Props
      const latestProps = support.propsConfig.latestCloned
      selfPropChange = !deepEqual(nowProps, latestProps)
    }
  }

  const tag = renderExistingTag(
    oldest,
    support,
    ownerSupport as Support, // useSupport,
    subject,
  )
  
  if(ownerSupport && selfPropChange) {
    const myOwnerSupport = ownerSupport.subject.global.newest as Support
    renderSupport(
      myOwnerSupport,
      true,
    )

    return tag as T
  }

  return tag as T
}
