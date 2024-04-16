import { letState } from './letState.function'

export type WatchCallback = (
  currentValues: any[],
  previousValues: any[] | undefined // first run this is undefined
) => unknown | ((currentValues: any[]) => unknown) | (() => unknown)

/** When an item in watch array changes, callback function will be triggered */
export function watch<T>(
  currentValues: T[],
  callback: WatchCallback
): T[] {
  let previousValues = letState(undefined as undefined | unknown[])(x => [previousValues, previousValues = x])

  if(previousValues === undefined) {
    callback(currentValues, previousValues)
    // const result = {currentValues, previousValues}
    previousValues = currentValues
    return currentValues
  }

  const allExact = currentValues.every((item, index) => item === (previousValues as any[])[index])
  if(allExact) {
    return currentValues
  }

  callback(currentValues, previousValues)
  previousValues.length = 0
  previousValues.push(...currentValues)

  return currentValues
}
