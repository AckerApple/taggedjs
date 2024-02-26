import { Config, GetSet, StateConfig, StateConfigItem, getStateValue, makeStateResult } from "./set.function.js"
import { setUse } from "./setUse.function.js"

/** Used for variables that need to remain the same variable during render passes */
export function setProp <T>(
  getSet: GetSet<any>
): T {
  const config: Config = setUse.memory.stateConfig

  const [propValue] = getSet(undefined as T)
  getSet(propValue) // restore original value instead of undefined

  const restate = config.rearray[config.array.length]
  if(restate) {
    let watchValue = restate.watch as T
    let oldValue = getStateValue(restate) as T

    const push: StateConfigItem<T> = {
      callback: getSet,
      lastValue: oldValue,
      watch: restate.watch,
    }

    // has the prop value changed?
    if(propValue != watchValue) {
      push.watch = propValue
      oldValue = push.lastValue = propValue
    }

    config.array.push(push)

    getSet(oldValue)

    return oldValue
  }

  const push: StateConfigItem<T> = {
    callback: getSet,
    lastValue: propValue,
    watch: propValue,
  }
  config.array.push(push)
  
  return propValue
}
