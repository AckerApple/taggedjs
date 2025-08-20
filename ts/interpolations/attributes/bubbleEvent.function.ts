export function bubbleEvent(
  event: Event,
  replaceEventName: string,
  target: Element
) {
  const callback = (target as any)[replaceEventName]

  if(callback) {
    let stopped = false
    
    ;(event as any).originalStopPropagation = event.stopPropagation;
    
    event.stopPropagation = function() {
      stopped = true
      ;(event as any).originalStopPropagation.call(event)
      event.stopPropagation = (event as any).originalStopPropagation
      delete (event as any).originalStopPropagation
    }
  
    callback(event)

    if(event.defaultPrevented || stopped) {
      return
    }
  }

  const parentNode = target.parentNode
  if(parentNode) {
    bubbleEvent(event, replaceEventName, parentNode as Element)
  }
}
