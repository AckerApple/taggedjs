import { AnySupport, Support } from '../Support.class.js'
import { deepEqual } from '../../deepFunctions.js'
import { renderExistingTag } from'./renderExistingTag.function.js'
import { Props } from '../../Props.js'
import { ValueTypes } from '../ValueTypes.enum.js'

/** Main function used by all other callers to render/update display of a tag component */
export function renderSupport<T extends AnySupport>(
  support: T, // must be latest/newest state render
  renderUp: boolean,
): T {
  const global = support.subject.global
  const templater = support.templater
  const isInlineHtml = !templater.wrapper && templater.tagJsType !== ValueTypes.stateRender
  const ownerSupport = (support as Support).ownerSupport

  // is it just a vanilla tag, not component?
  if( isInlineHtml ) {// || isTagTemplater(templater) 
    if(ownerSupport.subject.global.deleted) {
      return support
    }

    ++global.renderCount
    return renderSupport(ownerSupport.subject.global.newest as Support, true) as T
  }

  if(support.subject.global.locked) {
    support.subject.global.blocked.push(support)
    return support
  }

  const subject = support.subject
  const oldest = support.subject.global.oldest
  
  let selfPropChange = false
  const shouldRenderUp = renderUp && support

  if(shouldRenderUp && ownerSupport) {
    const nowProps = templater.props as Props
    const latestProps = support.propsConfig.latestCloned
    selfPropChange = !deepEqual(nowProps, latestProps)
  }

  // ??? newly moved above renderExistingTag
  // render up first and that will cause me to re-render
  if(ownerSupport && selfPropChange) {
    global.locked = true
    // const myRenderCount = global.renderCount
    const myOwnerSupport = ownerSupport.subject.global.newest as Support
    renderSupport(
      myOwnerSupport,
      true,
    )

    if(global.blocked.length) {
      support = global.blocked.pop() as T
      delete global.locked
      global.blocked.length = 0
    }
  }

  const tag = renderExistingTag(
    oldest,
    support,
    ownerSupport as Support, // useSupport,
    subject,
  )
  
  return tag as T
}
