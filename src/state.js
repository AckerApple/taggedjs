export const config = {
  array: [],
  rearray: [],
  /** @type {Tag | undefined} */
  currentTag: undefined
}

/**
 * @template T
 * @param {T} defaultValue 
 * @returns {T}
 */
export function state(
  defaultValue,
  getSetMethod,
) {
  const restate = config.rearray[config.array.length]
  if(restate) {
    const [oldValue] = restate() // get old value will cause new value to be undefined
    restate(oldValue) // restore old value
    config.array.push(getSetMethod)
    return oldValue // return old value instead
  }

  config.array.push(getSetMethod)
  return defaultValue
}
