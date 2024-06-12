import { TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { TagWrapper } from './tag.utils.js'
import { runTagCallback } from'../interpolations/bindSubjectCallback.function.js'
import { BaseSupport, Support } from './Support.class.js'
import { TagSubject } from '../subject.types.js'
import { castProps } from'../alterProp.function.js'
import { setUse } from '../state/setUse.function.js'
import { Tag } from './Tag.class.js'
import { State } from '../state/state.utils.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { html } from './html.js'
import { Props } from '../Props.js'
import { syncFunctionProps } from './update/updateExistingTagComponent.function.js'

/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
export function getTagWrap(
  templater: TemplaterResult,
  result: TagWrapper<any>
): Wrapper {
  const stateArray = setUse.memory.stateConfig.array

  // this function gets called by taggedjs
  const wrapper = (
    newSupport: Support,
    subject: TagSubject,
    lastSupport?: Support | BaseSupport | undefined
  ) => executeWrap(
    stateArray,
    templater,
    result,
    newSupport,
    subject,
    lastSupport,
  )

  return wrapper as Wrapper
}

function executeWrap(
  stateArray:  State,
  templater: TemplaterResult,
  result: TagWrapper<any>,
  newSupport: Support,
  subject: TagSubject,
  lastSupport?: Support | BaseSupport | undefined,
): Support {
  const global = newSupport.subject.global
  ++global.renderCount
      
  const childSubject = templater.children
  const lastArray = global.oldest?.templater.children.lastArray
  if(lastArray) {
    childSubject.lastArray = lastArray
  }

  // result.original
  const originalFunction = result.original // (innerTagWrap as any).original as unknown as TagComponent

  let props = templater.props

  // When defined, this must be an update where my new props have already been made for me
  let preCastedProps: Props | undefined = newSupport.propsConfig.castProps

  const lastCastProps = lastSupport?.propsConfig.castProps
  if(lastCastProps) {
    newSupport.propsConfig.castProps = lastCastProps
    preCastedProps = syncFunctionProps(
      newSupport,
      lastSupport as Support,
      (lastSupport as Support).ownerSupport,
      props,
    )
  }

  const castedProps = preCastedProps || castProps(
    props,
    newSupport,
    stateArray,
    0,
  )

  // CALL ORIGINAL COMPONENT FUNCTION
  let tag: Tag = originalFunction(...castedProps)
  if(tag instanceof Function) {
    tag = tag()
  }
  
  if(!tag || tag.tagJsType !== ValueTypes.tag) {
    tag = html`${tag}` // component returned a non-component value
    
  }

  tag.templater = templater
  templater.tag = tag
  tag.memory.arrayValue = templater.arrayValue // tag component could have been used in array.map

  const support = new Support(
    templater,
    newSupport.ownerSupport,
    subject,
    castedProps,
    global.renderCount
  )

  support.subject.global = global
  // ??? this should be set by outside?
  global.oldest = global.oldest || support
  
  // ??? new
  // global.newest = support

  const nowState = setUse.memory.stateConfig.array
  support.state.push(...nowState)

  if( templater.madeChildIntoSubject ) {
    const value = childSubject.value
    for (let index = value.length - 1; index >= 0; --index) {
      const kid = value[index]
      const values = kid.values
      for (let index = values.length - 1; index >= 0; --index) {
        const value = values[index]
        if(!(value instanceof Function)) {
          continue
        }

        const valuesValue = kid.values[index]
        
        if(valuesValue.isChildOverride) {
          continue // already overwritten
        }

        // all functions need to report to me
        kid.values[index] = function(...args: unknown[]) {
          return runTagCallback(
            value, // callback
            support.ownerSupport,
            this, // bindTo
            args
          )
        }
        
        valuesValue.isChildOverride = true
      }
    }
  }

  return support
}