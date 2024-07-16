import { AnySupport, Support } from '../Support.class.js'
import { deepEqual } from '../../deepFunctions.js'
import { renderExistingTag } from'./renderExistingTag.function.js'
import { Props } from '../../Props.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { TemplaterResult } from '../TemplaterResult.class.js'
import { runBlocked } from '../../interpolations/attributes/bindSubjectCallback.function.js'
import { paint, painting } from '../paint.function.js'
import { syncStates } from '../../state/syncStates.function.js'

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

  if(renderUp && support) {
    ++painting.locks
    checkRenderUp(
      ownerSupport, // || support.templater.tag?.ownerSupport,
      templater,
      support,
    )
    --painting.locks
    if(global.deleted) {
      paint()
      delete global.locked
      return support // exit because got deleted by parent
    }
    // paint()
  }

  if(global.blocked.length) {
    support = global.blocked.pop() as T
    global.blocked.length = 0
  }

  // syncStates((global.newest as Support).state, support.state)

  delete global.locked

  const tag = renderExistingTag(
    oldest,
    support,
    ownerSupport as Support, // useSupport,
    subject,
  )
  
  // ??? Test
  // paint()

  return tag as T
}

export function renderInlineHtml(
  ownerSupport: AnySupport,
  support: AnySupport,
) {
  if(ownerSupport.subject.global.deleted) {
    return support
  }

  // ??? new change
  const newest = ownerSupport.subject.global.newest || ownerSupport
  const result = renderSupport(
    newest as Support,
    true, // false, // true,
  )

  return result
}

export function makeRenderUp(
  ownerSupport: AnySupport,
  templater: TemplaterResult,
  support: AnySupport,
) {
  const result = checkRenderUp(
    ownerSupport,
    templater,
    support,
  )

  if(result) {
    const ownerGlobal = ownerSupport.subject.global
    const myOwnerSupport = ownerGlobal.newest as Support

    renderSupport(
      myOwnerSupport,
      true,
    )
  }
}

export function checkRenderUp(
  ownerSupport: AnySupport,
  templater: TemplaterResult,
  support: AnySupport,
) {
  if(!ownerSupport) {
    return false
  }

  const selfPropChange = hasPropsToOwnerChanged(
    templater,
    support,
  )
  
  // render owner up first and that will cause me to re-render
  if(ownerSupport && selfPropChange) {    
    return true
  }

  return false
}

function hasPropsToOwnerChanged(
  templater: TemplaterResult,
  support: AnySupport,
) {
  if(support.templater.tagJsType === ValueTypes.stateRender) {
    return true
  }

  const nowProps = templater.props as Props
  const latestProps = support.propsConfig.latestCloned
  const noLength = nowProps && nowProps.length === 0 && latestProps.length === 0
  return !(noLength || deepEqual(nowProps, latestProps))
}
