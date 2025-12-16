import { bubbleEvent } from './bubbleEvent.function.js';
export function addSupportEventListener(support, eventName, element, callback) {
    const elm = support.appElement;
    const replaceEventName = getEventReferenceName(eventName);
    if (eventName === 'blur') {
        eventName = 'focusout';
    }
    const context = support.context;
    const eventReg = context.events;
    if (!eventReg[eventName]) {
        const listener = function eventCallback(event) {
            bubbleEvent(event, replaceEventName, event.target);
        };
        eventReg[eventName] = listener;
        elm.addEventListener(eventName, listener);
    }
    // attach to element as "_click" and "_keyup"
    ;
    element[replaceEventName] = callback;
    element[eventName] = callback;
}
export function getEventReferenceName(eventName) {
    // cast events that do not bubble up into ones that do
    if (eventName === 'blur') {
        eventName = 'focusout';
    }
    return '_' + eventName;
}
//# sourceMappingURL=addSupportEventListener.function.js.map