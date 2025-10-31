import { Subject, ValueSubject } from'../subject/index.js'
import { AnySupport, tag } from '../tag/index.js'
import { ContextStateMeta, ContextStateSupport } from '../tag/ContextStateMeta.type.js'
import { getSupportInCycle } from'../tag/cycles/getSupportInCycle.function.js'
import { setUseMemory } from'./setUseMemory.object.js'
import { state } from'./state.function.js'
import { oldSyncStates } from'./syncStates.function.js'

export type WatchCallback<T> = (
  currentValues: any[], // | (() => any[]),
  previousValues: any[] | undefined // first run this is undefined
) => T | ((currentValues: any[]) => T) | (() => T)

type WatchOperators<T> = {
  setup: WatchSetup<T>,

  /** When an item in watch array changes, callback function will be triggered. Does not trigger on initial watch setup. */
  noInit: (<T>(
    currentValues: any[] | (() => any[]),
    callback: WatchCallback<T>
  ) => T | undefined) & MasterWatch<T>
  
  /** When an item in watch array changes, callback function will be triggered */
  asSubject: (<T>(
    currentValues: any[] | (() => any[]),
    callback: WatchCallback<T>
  ) => Subject<T>) & MasterWatch<T>
  
  /** When an item in watch array changes and all values are truthy then callback function will be triggered */
  truthy: (<T>(
    currentValues: any[] | (() => any[]),
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
 * When an item in watch array changes, callback function will be triggered.
 * Triggers on initial watch setup. TIP: try watch.noInit()
 * @param currentValues T[]
 * @param callback WatchCallback
 * @returns T[]
 */
export const watch = (<T>(
  currentValues: unknown[] | (() => unknown[]),
  callback: WatchCallback<T>
): T => {
  return setupWatch(currentValues, callback).pastResult
}) as (<T>(
  currentValues: unknown[] | (() => any[]),
  callback: WatchCallback<T>
) => T) & WatchOperators<any>

const defaultFinally = <T>(x: T) => x

type WatchSetup<R> = {
  // when `watch.noInit(...)` is used, init will be empty function
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
    return setupWatch(currentValues, callback, setup).pastResult
  }

  method.setup = setup

  defineOnMethod(() => method as any, method)
  
  return method as any
}

type PreviousWatchMeta<T> = {
  pastResult: T
  values: any[]
}

/**
 * puts above functionality together
 * @param currentValues values being watched
 * @param callback (currentValue, previousValues) => resolveToValue
 * @param param2 
 * @returns 
 */
const setupWatch = <T, R>(
  currentValues: any[] | (() => any[]),
  callback: WatchCallback<T>,
  {
    init,
    before,
    final = defaultFinally,  
  }: WatchSetup<R> = {}
): PreviousWatchMeta<T> => {
  const previous = state({
    pastResult: undefined as T,
    values: undefined as unknown as any[],
  })

  const isFun = typeof(currentValues) === 'function'
  const realValues = isFun ? currentValues() : currentValues
  const isFirstRender = previous.values === undefined
  let renderCount = 0
  
  if(isFirstRender) {
    if(typeof(currentValues) === 'function') {
      tag.onRender(() => {
        ++renderCount
        if(renderCount === 1) {
          return // first run is already performed
        }
        const realValues = currentValues()
        processRealValues(realValues)
      })
    }
  }

  function processRealValues(realValues: any[]) {
    // First time running watch?
    if(previous.values === undefined) {
      if(before && !before(realValues)) {
        previous.values = realValues
        return previous // do not continue
      }
    
      const castedInit = init || callback
      const result = castedInit(realValues, previous.values)
      previous.pastResult = final(result)
      previous.values = realValues
      return previous
    }

    const allExact = realValues.every((item, index) =>
      item === previous.values[index]
    )
    
    if(allExact) {
      return previous
    }

    if(before && !before(realValues)) {
      previous.values = realValues
      return previous // do not continue
    }

    const result = callback(realValues, previous.values) as T
    previous.pastResult = final(result)
    previous.values.length = 0
    previous.values.push(...realValues)

    return previous
  }

  return processRealValues(realValues)
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
      const firstSupport = state(() => (getSupportInCycle() as AnySupport))
      const subject = state(() => {
        return new ValueSubject<any>(undefined)
      })
      const oldState = state(() => ({
        state: setUseMemory.stateConfig.state,
        states: setUseMemory.stateConfig.states,
      }))
      
      const method = <T>(
        currentValues: any[] | (() => any[]),
        callback: WatchCallback<T>  
      ) => {
        const handler = (
          realValues: any[],
          previousValues: any[] | undefined
        ) => {
          const nowSupport = getSupportInCycle() as AnySupport
          const setTo = callback(realValues, previousValues)

          if(nowSupport !== firstSupport) {
            const newestState = oldState.state
            const context = firstSupport.context
            const stateMeta = context.state as ContextStateMeta
            const oldestStateSupport = stateMeta.older as ContextStateSupport

            if(oldestStateSupport) {
              const oldestState = oldestStateSupport.state
              
              const newStates = oldState.states
              const oldStates = oldestStateSupport.states
              
              oldSyncStates(
                newestState,
                oldestState,
                newStates,
                oldStates,
              )
            }
          }

          subject.next(setTo)
        }

        setupWatch(
          currentValues,
          handler,
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
