import { signal } from './signal.function.js'
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
): T[] {
  const propStates2 = signal([])
  const passes = signal(0)
  const passedOn = signal(0)

  let nowValues: unknown[] = []
  let passed = 0

  passedOn.value = passes.value
  
  setter((...values: any[]) => {
    nowValues = values
    return propStates2.value
  })
  
  // When the watched variable changes, then the local prop variable has to update
  watch(nowValues, () => {
    ++passed // first time values and changed values cause new state

    propStates2.value = nowValues as any

    setter(() => nowValues as any)
  }) as any

  // called and only used during sync'ing processes
  states((_x: any, direction) => {
    // now its collection of variables time
    if(passed) {
      setter((...values: any[]) => {
        if(!direction || direction === 1) {
          propStates2.value = values as any
        }
        
        return propStates2.value
      })

      passedOn.value = passes.value
      ++passes.value

      return
    }

    // this in an insync call, we do not care about the values here
    setter(() => {
      return propStates2.value
    })
  })
  
  ++passed
  
  return propStates2.value
}
