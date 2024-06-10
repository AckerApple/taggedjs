import { TemplaterResult } from '../TemplaterResult.class.js';
import { Support } from '../Support.class.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { getValueType } from '../getValueType.function.js';
import { TagJsSubject, getNewGlobal } from './TagJsSubject.class.js';
export function processNewValue(value, ownerSupport) {
    const valueType = getValueType(value);
    switch (valueType) {
        case ValueTypes.tagComponent:
            return new TagJsSubject(value); // ownerSupport.global.value
        case ValueTypes.templater:
            const templater = value;
            const tag = templater.tag;
            return processNewTag(tag, ownerSupport);
        case ValueTypes.tag:
            return processNewTag(value, ownerSupport);
        case ValueTypes.subject:
            value.global = getNewGlobal();
            return value;
    }
    return new TagJsSubject(value);
}
function processNewTag(value, ownerSupport) {
    const tag = value;
    let templater = tag.templater;
    if (!templater) {
        templater = new TemplaterResult([]);
        templater.tag = tag;
        tag.templater = templater;
    }
    const subject = new TagJsSubject(templater);
    subject.support = new Support(templater, ownerSupport, subject);
    subject.global.oldest = subject.support;
    ownerSupport.subject.global.childTags.push(subject.support);
    return subject;
}
//# sourceMappingURL=processNewValue.function.js.map