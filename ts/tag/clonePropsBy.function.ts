import { Props } from '../Props.js'
import { AnySupport } from './Support.class.js'
import {  ValueTypes } from './ValueTypes.enum.js'
import { cloneTagJsValue } from './cloneValueArray.function.js'

export function clonePropsBy(
  support: AnySupport,
  props: Props,
  castedProps?: Props,
) {
  const templater = support.templater

  if(templater.tagJsType === ValueTypes.stateRender) {
    return support.propsConfig = {
      latest: [],
      latestCloned: [],
    }
  }

  if(templater.deepPropWatch === false) {
    return support.propsConfig = {
      latest: props,
      latestCloned: props, // assume its HTML children and then detect
      castProps: castedProps,
    }  
  }

  const latestCloned = props.map(props =>
    cloneTagJsValue(props)
  )
  return support.propsConfig = {
    latest: props,
    latestCloned, // assume its HTML children and then detect
    castProps: castedProps,
  }
}
