import { Props } from '../Props.js'
import { AnySupport } from './Support.class.js'
import {  ValueTypes } from './ValueTypes.enum.js'
import { cloneTagJsValue } from './cloneValueArray.function.js'
import { deepCompareDepth, shallowCompareDepth } from './hasSupportChanged.function.js'
import { PropWatches } from './tag.js'

export function clonePropsBy(
  support: AnySupport,
  props: Props,
  castProps?: Props, // props that have run through getCastedProps
) {
  const templater = support.templater
  if(templater.tagJsType === ValueTypes.stateRender) {
    return
  }

  switch (templater.propWatch) {
    case PropWatches.IMMUTABLE:
      return support.propsConfig = {
        latest: props,
        castProps,
      }
  
    case PropWatches.SHALLOW:
      return support.propsConfig = {
        latest: props.map(x => cloneTagJsValue(x, shallowCompareDepth)),
        castProps,
      }
  }

  return support.propsConfig = {
    latest: props.map(props => cloneTagJsValue(props, deepCompareDepth)),
    castProps,
  }
}
