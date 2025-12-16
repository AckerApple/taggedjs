export function bubbleEvent(event, replaceEventName, target) {
    const callback = target[replaceEventName];
    if (callback) {
        let stopped = false;
        event.originalStopPropagation = event.stopPropagation;
        event.stopPropagation = function () {
            stopped = true;
            event.originalStopPropagation.call(event);
            event.stopPropagation = event.originalStopPropagation;
            delete event.originalStopPropagation;
        };
        callback(event);
        if (event.defaultPrevented || stopped) {
            return;
        }
    }
    const parentNode = target.parentNode;
    if (parentNode) {
        bubbleEvent(event, replaceEventName, parentNode);
    }
}
//# sourceMappingURL=bubbleEvent.function.js.map