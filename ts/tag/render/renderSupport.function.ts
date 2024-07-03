import { AnySupport, Support } from '../Support.class.js'
import { deepEqual } from '../../deepFunctions.js'
import { renderExistingTag } from'./renderExistingTag.function.js'
import { Props } from '../../Props.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { TemplaterResult } from '../TemplaterResult.class.js'

export function isInlineHtml(templater: TemplaterResult) {
  return !templater.wrapper && templater.tagJsType !== ValueTypes.stateRender
}

/** Main function used by all other callers to render/update display of a tag component */
export function renderSupport<T extends AnySupport>(
  support: T, // must be latest/newest state render
  renderUp: boolean,
): T {
  const global = support.subject.global
  const templater = support.templater
  const inlineHtml = isInlineHtml(templater)
  const ownerSupport = (support as Support).ownerSupport

  // is it just a vanilla tag, not component?
  if( inlineHtml ) {// || isTagTemplater(templater) 
    return renderInlineHtml(ownerSupport, support) as T
  }

  if(global.locked) {
    global.blocked.push(support)
    return support
  }

  global.locked = true

  const subject = support.subject
  const oldest = global.oldest
  
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
    // const myRenderCount = global.renderCount
    const myOwnerSupport = ownerSupport.subject.global.newest as Support
    renderSupport(
      myOwnerSupport,
      true,
    )

    if(global.blocked.length) {
      support = global.blocked.pop() as T
      global.blocked.length = 0
    }
  }
  
  const tag = renderExistingTag(
    oldest,
    support,
    ownerSupport as Support, // useSupport,
    subject,
  )
  
  delete global.locked

  return tag as T
}

export function renderInlineHtml(
  ownerSupport: AnySupport,
  support: AnySupport,
) {
  if(ownerSupport.subject.global.deleted) {
    return support
  }

  ++support.subject.global.renderCount
  return renderSupport(ownerSupport.subject.global.newest as Support, true)
}
