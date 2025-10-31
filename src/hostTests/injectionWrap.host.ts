import { host, state } from "taggedjs"

/** Local to gh-pages, creates an array of selected with an emitter */
export const injectionWrap = host((
  selected: any[],
  selectedChange?: (selected: any[]) => any,
) => {
  const targets = state([] as any[])
  return { selected, targets }
})
