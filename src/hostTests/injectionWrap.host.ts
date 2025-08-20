import { host, state } from "taggedjs"

export const injectionWrap = host((
  selected: any[],
  selectedChange?: (selected: any[]) => any,
) => {
  const targets = state([] as any[])
  return { selected, targets }
})
