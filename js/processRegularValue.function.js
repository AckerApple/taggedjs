import { updateBetweenTemplates } from './interpolateTemplate';
export function processRegularValue(value, subject, // could be tag via subject.tag
template) {
    subject.template = template;
    const before = subject.clone || template; // Either the template is on the doc OR its the first element we last put on doc
    if (subject.lastValue === value) {
        return; // no need to update display, its the same
    }
    subject.lastValue = value;
    // Processing of regular values
    const clone = updateBetweenTemplates(value, before);
    subject.clone = clone; // remember single element put down, for future updates
}
//# sourceMappingURL=processRegularValue.function.js.map