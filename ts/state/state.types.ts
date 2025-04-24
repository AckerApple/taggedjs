export type StateConfig<T> = (x: T) => [T, T]
export type StateConfigItem<T> = {
  get: () => T // TODO: only a convenience, not needed, remove
  callback?: StateConfig<T>
  defaultValue?: T
  watch?: T // when this value changes, the state becomes this value

  // lastValue?: T
}
export type State = StateConfigItem<any>[]
