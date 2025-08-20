import { BaseTagGlobal, EventCallback } from '../../tag/index.js'
import { Events } from '../../tag/getTemplaterResult.function.js'
import { AnySupport } from '../../tag/index.js'
import { bubbleEvent } from './bubbleEvent.function.js'

export function addSupportEventListener(
  support: AnySupport,
  eventName: string,
  element: Element,
  callback: EventCallback,
) {
  const elm = support.appElement as Element
  const replaceEventName = getEventReferenceName(eventName)

  if(eventName === 'blur') {
    eventName = 'focusout'
  }

  const global = support.context.global as BaseTagGlobal
  const eventReg = global.events as Events
  
  if(!eventReg[eventName]) {
    const listener = function eventCallback(event: Event) {
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

export function getEventReferenceName(eventName: string) {
  // cast events that do not bubble up into ones that do
  if(eventName === 'blur') {
    eventName = 'focusout'
  }

  return '_' + eventName
}
