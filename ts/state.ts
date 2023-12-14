import { Tag } from "./Tag.class.js"

type ConfigArray = ((x?: any) => [any, any])[]

export const config = {
  array: [] as ConfigArray,
  rearray: [] as ConfigArray,
  currentTag: undefined as Tag | undefined
}

/**
 * @template T
 * @param {T} defaultValue 
 * @returns {T}
 */
export function state <T>(
  defaultValue: T,
  getSetMethod?: (x: T) => [T, T],
): T {
  const restate = config.rearray[config.array.length]
  if(restate) {
    const [oldValue] = restate() // get old value will cause new value to be undefined
    restate(oldValue) // restore old value
    config.array.push( getSetMethod as any )
    return oldValue // return old value instead
  }

  config.array.push(getSetMethod as any)
  return defaultValue
}
