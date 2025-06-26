import { BaseTagGlobal, EventCallback } from '../../tag/index.js'
import { Events } from '../../tag/getTemplaterResult.function.js'
import { AnySupport } from '../../tag/AnySupport.type.js'

export function addSupportEventListener(
  support: AnySupport,
  eventName: string,
  element: Element,
  callback: EventCallback,
) {
  const elm = support.appElement as Element

  // cast events that do not bubble up into ones that do
  if(eventName === 'blur') {
    eventName = 'focusout'
  }

  const replaceEventName = '_' + eventName
  // const replaceEventName = eventName

  const global = support.context.global as BaseTagGlobal
  const eventReg = global.events as Events
  
  if(!eventReg[eventName]) {
    const listener = function eventCallback(event: Event) {
      (event as any).originalStopPropagation = event.stopPropagation;
      bubbleEvent(event, replaceEventName, event.target as Element)
    }
    eventReg[eventName] = listener
    elm.addEventListener(eventName, listener)
  }

  // attach to element but not as "_click" and "_keyup"
  ;(element as any)[replaceEventName] = callback
  // attach to element but not as "click" and "keyup"
  ;(element as any)[eventName] = callback
}

function bubbleEvent(
  event: Event,
  replaceEventName: string,
  target: Element
) {
  const callback = (target as any)[replaceEventName]

  if(callback) {
    let stopped = false
    event.stopPropagation = function() {
      stopped = true
      ;(event as any).originalStopPropagation.call(event)
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
