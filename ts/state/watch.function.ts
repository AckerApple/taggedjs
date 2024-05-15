import { Subject } from '../subject'
import { state } from './state.function'

export type WatchCallback<T> = (
  currentValues: any[],
  previousValues: any[] | undefined // first run this is undefined
) => T | ((currentValues: any[]) => T) | (() => T)


type WatchResult<T> = ((
  currentValues: any[],
  callback: WatchCallback<T>
) => T) & {
  setup: WatchSetup<T>,
  noInit: (
    currentValues: any[],
    callback: WatchCallback<T>
  ) => T | undefined,
  asSubject: (
    currentValues: any[],
    callback: WatchCallback<T>
  ) => Subject<T>
  truthy: (
    currentValues: any[],
    callback: WatchCallback<T>
  ) => T | undefined
}

/**
 * When an item in watch array changes, callback function will be triggered. Triggers on initial watch setup. TIP: try watch.noInit()
 * @param currentValues T[]
 * @param callback WatchCallback
 * @returns T[]
 */
export const watch = <T>(
  currentValues: any[],
  callback: WatchCallback<T>
): T => {
  return setupWatch(currentValues, callback)
}

/** When an item in watch array changes, callback function will be triggered. Does not trigger on initial watch setup. */
watch.noInit = <T>(
  currentValues: any[],
  callback: WatchCallback<T>
): T | undefined => {
  return undefined // this is a fake function... See defineProperty(watch)
}

/** When an item in watch array changes and all values are truthy then callback function will be triggered */
watch.truthy = <T>(
  currentValues: any[],
  callback: WatchCallback<T>
): Subject<T> => {
  return undefined as any // this is a fake function... See defineProperty(watch)
}

/** When an item in watch array changes, callback function will be triggered */
watch.asSubject = <T>(
  currentValues: any[],
  callback: WatchCallback<T>
): Subject<T> => {
  return undefined as any // this is a fake function... See defineProperty(watch)
}

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

/** puts above functionality together */
const setupWatch = <T, R>(
  currentValues: any[],
  callback: WatchCallback<T>,
  {
    init,
    before = () => true,
    final = defaultFinally,  
  }: WatchSetup<R> = {}
): T => {
  let previous = state({
    pastResult: undefined as T,
    values: undefined as unknown as any[],
  })

  const previousValues = previous.values

  // First time running watch?
  if(previousValues === undefined) {
    if(!before(currentValues)) {
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
    item === (previousValues as any[])[index]
  )
  if(allExact) {
    return previous.pastResult
  }

  if(!before(currentValues)) {
    previous.values = currentValues
    return previous.pastResult // do not continue
  }

  const result = callback(currentValues, previousValues) as T
  previous.pastResult = final(result)
  previousValues.length = 0
  previousValues.push(...currentValues)

  return previous.pastResult
}

function defineOnMethod(
  getWatch: () => WatchResult<unknown>,
  attachTo: any
) {  
  Object.defineProperty(attachTo, 'noInit', {
    get() {
      const watch = getWatch()
      watch.setup.init = () => undefined
      return watch
    },
  })

  Object.defineProperty(attachTo, 'asSubject', {
    get() {
      const watch = getWatch()
      const subject = state(() => new Subject())
      watch.setup.final = (x: any) => {
        subject.set(x)
        return subject
      }
      return watch
    },
  })

  Object.defineProperty(attachTo, 'truthy', {
    get() {
      const watch = getWatch()
      watch.setup.before = (currentValues: any[]) => currentValues.every(x => x)
      return watch
    },
  })
}

defineOnMethod(() => newWatch({}), watch)
