import { TagTemplate } from './Tag.class.js'

export function isLastRunMatched(
  strings: string[],
  values: unknown[],
  lastRun?: TagTemplate,
) {
  if(lastRun) {
    if (lastRun.strings.length === strings.length) {
      const stringsMatch = lastRun.strings.every((string: string, index: number) =>
        // string.length === strings[index].length
        string === strings[index]
      )
      if (stringsMatch && lastRun.values.length === values.length) {
        return true // performance savings using the last time this component was rendered
      }
    }
  }
  return false
}
