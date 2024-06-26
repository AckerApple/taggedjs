import { castTextValue, updateBeforeTemplate } from '../../updateBeforeTemplate.function.js';
export function processRegularValue(value, subject, // could be tag via subject.tag
insertBefore) {
    subject.global.insertBefore = insertBefore;
    const before = subject.global.placeholder || insertBefore; // Either the template is on the doc OR its the first element we last put on doc
    // matches but also was defined at some point
    if (subject.lastValue === value && 'lastValue' in subject) {
        return; // no need to update display, its the same
    }
    subject.lastValue = value;
    const castedValue = castTextValue(value);
    // replace existing string?
    const oldClone = subject.global.placeholder;
    if (oldClone) {
        oldClone.textContent = castedValue;
        return;
    }
    // Processing of regular values
    const clone = updateBeforeTemplate(castedValue, before);
    subject.global.placeholder = clone; // remember single element put down, for future updates
}
export function processFirstRegularValue(value, subject, // could be tag via subject.tag
insertBefore) {
    subject.lastValue = value;
    const castedValue = castTextValue(value);
    // Processing of regular values
    const clone = updateBeforeTemplate(castedValue, insertBefore);
    subject.global.placeholder = clone; // remember single element put down, for future updates 
}
//# sourceMappingURL=processRegularValue.function.js.map