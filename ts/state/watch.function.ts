import { Subject, ValueSubject } from'../subject/index.js'
import { Support } from '../tag/Support.class.js'
import { getSupportInCycle } from'../tag/getSupportInCycle.function.js'
import { setUse } from'./setUse.function.js'
import { state } from'./state.function.js'
import { syncStates } from'./syncStates.function.js'

export type WatchCallback<T> = (
  currentValues: any[],
  previousValues: any[] | undefined // first run this is undefined
) => T | ((currentValues: any[]) => T) | (() => T)

type WatchOperators<T> = {
  setup: WatchSetup<T>,
  /** When an item in watch array changes, callback function will be triggered. Does not trigger on initial watch setup. */
  noInit: (<T>(
    currentValues: any[],
    callback: WatchCallback<T>
  ) => T | undefined) & MasterWatch<T>
  
  /** When an item in watch array changes, callback function will be triggered */
  asSubject: (<T>(
    currentValues: any[],
    callback: WatchCallback<T>
  ) => Subject<T>) & MasterWatch<T>
  
  /** When an item in watch array changes and all values are truthy then callback function will be triggered */
  truthy: (<T>(
    currentValues: any[],
    callback: WatchCallback<T>
  ) => T | undefined) & MasterWatch<T>
}

type WatchResult<T> = ((
  currentValues: any[],
  callback: WatchCallback<T>
) => T) & WatchOperators<T>

type MasterWatch<T> = ((
  currentValues: any[],
  callback: WatchCallback<T>
) => T) & WatchOperators<T>

/**
 * When an item in watch array changes, callback function will be triggered. Triggers on initial watch setup. TIP: try watch.noInit()
 * @param currentValues T[]
 * @param callback WatchCallback
 * @returns T[]
 */
export const watch = (<T>(
  currentValues: any[],
  callback: WatchCallback<T>
): T => {
  return setupWatch(currentValues, callback)
}) as MasterWatch<any>

const defaultFinally = <T>(x: T) => x

type WatchSetup<R> = {
  init?: (currentValues: any[], previousValues: any[]) => R
  final?: (x: any) => any,
  before?: (currentValues: any[]) => boolean,
}

function newWatch<T, R>(
  setup: WatchSetup<R>
): WatchResult<T> {
  const method = <T>(
    currentValues: any[],
    callback: WatchCallback<T>  
  ) => {
    return setupWatch(currentValues, callback, setup)
  }

  method.setup = setup

  defineOnMethod(() => method as any, method)
  
  return method as any
}

/**
 * puts above functionality together
 * @param currentValues values being watched
 * @param callback (currentValue, previousValues) => resolveToValue
 * @param param2 
 * @returns 
 */
const setupWatch = <T, R>(
  currentValues: any[],
  callback: WatchCallback<T>,
  {
    init,
    before,
    final = defaultFinally,  
  }: WatchSetup<R> = {}
): T => {
  const previous = state({
    pastResult: undefined as T,
    values: undefined as unknown as any[],
  })

  const previousValues = previous.values

  // First time running watch?
  if(previousValues === undefined) {
    if(before && !before(currentValues)) {
      previous.values = currentValues
      return previous.pastResult // do not continue
    }
  
    const castedInit = init || callback
    const result = castedInit(currentValues, previousValues)
    previous.pastResult = final(result)
    previous.values = currentValues
    return previous.pastResult
  }

  const allExact = currentValues.every((item, index) =>
    item === previousValues[index]
  )
  if(allExact) {
    return previous.pastResult
  }

  if(before && !before(currentValues)) {
    previous.values = currentValues
    return previous.pastResult // do not continue
  }

  const result = callback(currentValues, previousValues) as T
  previous.pastResult = final(result)
  previousValues.length = 0
  previousValues.push(...currentValues)

  return previous.pastResult
}

function defineOnMethod<R>(
  getWatch: () => WatchResult<unknown>,
  attachTo: R
): R {  
  Object.defineProperty(attachTo, 'noInit', {
    get() {
      const watch = getWatch()
      watch.setup.init = () => undefined
      return watch
    },
  })

  Object.defineProperty(attachTo, 'asSubject', {
    get() {
      const oldWatch = getWatch()
      const firstSupport = state(() => (getSupportInCycle() as Support))
      const subject = state(() => new ValueSubject<any>(undefined))
      
      const method = <T>(
        currentValues: any[],
        callback: WatchCallback<T>  
      ) => {
        setupWatch(
          currentValues,
          (currentValues, previousValues) => {
            const nowSupport = getSupportInCycle()
            const setTo = callback(currentValues, previousValues)

            if(nowSupport !== firstSupport) {
              const newestState = setUse.memory.stateConfig.array
              syncStates(
                newestState,
                firstSupport.state,
              )
            }

            subject.next(setTo)
          },
          oldWatch.setup
        )

        return subject
      }

      method.setup = oldWatch.setup

      defineOnMethod(() => method as any, method)
      
      return method
    },
  })

  Object.defineProperty(attachTo, 'truthy', {
    get() {
      const watch = getWatch()
      watch.setup.before = (currentValues: any[]) => currentValues.every(x => x)
      return watch
    },
  })

  return attachTo
}

defineOnMethod(() => newWatch({}), watch)
