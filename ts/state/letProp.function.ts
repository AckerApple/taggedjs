import { signal } from '../subject/signal.function.js'
import { states } from './states.function.js'
import { watch } from'./watch.function.js'

/**
 * Enables the ability to maintain a change to a props value until the prop itself changes
 * @param prop typically the name of an existing prop
 * @returns immediately call the returned function: letProp(y)(x => [y, y=x])
 */
export function letProp<T>(
  setter: (
    set: <T>(...args: T[]) => T[]
  ) => any
) {
  const propStates2 = signal([])
  const passes = signal(0)
  const passedOn = signal(0)
  let nowValues: unknown[] = []
  let passed = 0

  passedOn.value = passes.value
  
  setter((...values: any[]) => {
    nowValues = values
    return values
  })
  
  // When the watched variable changes, then the local prop variable has to update
  watch(nowValues, () => {
    ++passed // first time values and changed values cause new state

    propStates2.value = nowValues as any

    setter(() => nowValues as any)
  }) as any

  // called and only used during sync'ing processes
  states(() => {
    if(passed) {      
      setter((...values: any[]) => {
        propStates2.value = values as any

        if(passes!=passedOn) {
          return propStates2.value
        }

        return values // propStates2.value
      })

      passedOn.value = passes.value
      ++passes.value

      return
    }

    setter(() => propStates2.value)
  })
  
  ++passed
  
  return propStates2.value
}
