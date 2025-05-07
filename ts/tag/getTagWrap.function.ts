import { TemplaterResult, Wrapper } from './getTemplaterResult.function.js'
import { TagWrapper } from './tag.utils.js'
import { PropsConfig, Support } from './createHtmlSupport.function.js'
import { castProps } from'../alterProp.function.js'
import { ContextItem } from './Context.types.js'
import { Props } from '../Props.js'
import { syncFunctionProps } from './update/updateExistingTagComponent.function.js'
import { executeWrap } from './executeWrap.function.js'
import { PropWatches } from './tag.function.js'
import { deepCompareDepth, shallowCompareDepth } from './hasSupportChanged.function.js'
import { createSupport } from './createSupport.function.js'
import { AnySupport } from './AnySupport.type.js'

/** creates/returns a function that when called then calls the original component function
 * Gets used as templater.wrapper()
 */
export function getTagWrap(
  templater: TemplaterResult,
  result: TagWrapper<any>
): Wrapper {
  // this function gets called by taggedjs
  const wrapper = function tagFunWrap(
    newSupport: AnySupport,
    subject: ContextItem,
    lastSupport?: AnySupport | undefined // subject.global.newest
  ) {
    // wrap any prop functions that are passed in
    const castedProps = getCastedProps(
      templater,
      newSupport,
      lastSupport,
    )
  
    const ownerSupport = newSupport.ownerSupport as AnySupport
    const useSupport = createSupport(
      templater,
      ownerSupport,
      newSupport.appSupport, // ownerSupport.appSupport as AnySupport,
      subject,
      castedProps,
    )

    return executeWrap(
      templater,
      result,
      useSupport,
      castedProps,
    )
  }

  return wrapper as Wrapper
}

export function getCastedProps(
  templater: TemplaterResult,
  newSupport: AnySupport,
  lastSupport?: AnySupport,
) {
  const maxDepth = templater.propWatch === PropWatches.DEEP ? deepCompareDepth : shallowCompareDepth
  const props = templater.props as Props
  const propsConfig = newSupport.propsConfig as PropsConfig

  // When defined, this must be an update where my new props have already been made for me
  let preCastedProps: Props | undefined = propsConfig.castProps
  const lastPropsConfig = lastSupport?.propsConfig
  const lastCastProps = lastPropsConfig?.castProps
  
  if(lastCastProps) {
    propsConfig.castProps = lastCastProps
    preCastedProps = syncFunctionProps(
      newSupport,
      lastSupport as AnySupport,
      (lastSupport as Support).ownerSupport,
      props,
      maxDepth,
    )
  }

  const castedProps = preCastedProps || castProps(
    props,
    newSupport,
    0,
  )

  return castedProps
}
