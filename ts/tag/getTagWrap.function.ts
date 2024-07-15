import { TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { TagWrapper } from './tag.utils.js'
import { AnySupport, BaseSupport, Support } from './Support.class.js'
import { TagSubject } from '../subject.types.js'
import { castProps } from'../alterProp.function.js'
import { setUse } from '../state/setUse.function.js'
import { ContextItem, StringTag } from './Tag.class.js'
import { State } from '../state/state.utils.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { html } from './html.js'
import { Props } from '../Props.js'
import { syncFunctionProps } from './update/updateExistingTagComponent.function.js'
import { syncStates } from '../state/syncStates.function.js'

/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
export function getTagWrap(
  templater: TemplaterResult,
  result: TagWrapper<any>
): Wrapper {

  // this function gets called by taggedjs
  const wrapper = (
    newSupport: Support,
    subject: TagSubject,
    lastSupport?: Support | BaseSupport | undefined
  ) => executeWrap(
    templater,
    result,
    newSupport,
    subject,
    lastSupport,
  )

  return wrapper as Wrapper
}

export function executeWrap(
  templater: TemplaterResult,
  result: TagWrapper<any>,
  newSupport: AnySupport,
  subject: ContextItem,
  lastSupport?: AnySupport | undefined,
): Support {
  const global = subject.global
  const originalFunction = result.original // (innerTagWrap as any).original as unknown as TagComponent
  const stateless = templater.tagJsType === ValueTypes.stateRender
  const castedProps = stateless ? [] : getCastedProps(
    templater,
    newSupport,
    lastSupport,
  )

  let tag: StringTag;
  if(stateless) {
    tag = templater as any as StringTag
  } else {
    tag = originalFunction(...castedProps)
  }

  // CALL ORIGINAL COMPONENT FUNCTION
  if(tag instanceof Function) {
    tag = tag()
  }
  
  const unknown = !tag || (tag.tagJsType && ![ValueTypes.tag,ValueTypes.dom].includes(tag.tagJsType))
  if(unknown) {
    tag = html`${tag}` // component returned a non-component value
  }

  tag.templater = templater
  templater.tag = tag
  ;(tag as any).arrayValue = (templater as any).arrayValue // tag component could have been used in array.map

  const support = new Support(
    templater,
    newSupport.ownerSupport as Support,
    subject,
    castedProps,
    global.renderCount
  )

  support.subject.global = global
  // ??? this should be set by outside?
  global.oldest = global.oldest || support

  const nowState = setUse.memory.stateConfig.array
  support.state.push(...nowState)

  return support
}

export function getCastedProps(
  templater: TemplaterResult,
  newSupport: AnySupport,
  lastSupport?: AnySupport,
) {
  const props = templater.props
  
  // When defined, this must be an update where my new props have already been made for me
  let preCastedProps: Props | undefined = newSupport.propsConfig.castProps

  const lastCastProps = lastSupport?.propsConfig.castProps
  if(lastCastProps) {
    newSupport.propsConfig.castProps = lastCastProps
    preCastedProps = syncFunctionProps(
      newSupport as Support,
      lastSupport as Support,
      (lastSupport as Support).ownerSupport,
      props,
    )
  }

  const castedProps = preCastedProps || castProps(
    props,
    newSupport,
    0,
  )

  return castedProps
}
