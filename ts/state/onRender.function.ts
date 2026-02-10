import { getContextInCycle, removeContextInCycle, setContextInCycle } from "../tag/cycles/setContextInCycle.function.js"
import { ContextItem } from "../tag/ContextItem.type.js"
import { tag } from "../TagJsTags/tag.function.js"

export function onRender<T>(
  callback: () => T
) {
  const context = getContextInCycle() as ContextItem

  const callbackWrap = (_isFirst?: boolean) => {
    // remember current context (old)
    // const oldIndex = setUseMemory.stateConfig.statesIndex
    const lastContext = getContextInCycle()
    
    // set to inner context cycle with previous state position
    setContextInCycle(context)

    const result = callback()
    
    // restore previous cycle
    removeContextInCycle()
    setContextInCycle(lastContext)
    
    return result
  }
  const subscription = context.render$.subscribe(() => {
    callbackWrap()
  })

  const result = callbackWrap()

  tag.onDestroy(() => subscription.unsubscribe())

  return result
}
