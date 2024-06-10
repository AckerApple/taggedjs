import { processSubjectComponent } from './processSubjectComponent.function.js';
import { processTagArray } from './processTagArray.js';
import { processFirstRegularValue } from './processRegularValue.function.js';
import { processTag, tagFakeTemplater } from './processTag.function.js';
import { renderTagOnly } from '../render/renderTagOnly.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { oneRenderToSupport } from './oneRenderToSupport.function.js';
import { getValueType } from '../getValueType.function.js';
export function processFirstSubjectValue(value, subject, // could be tag via result.tag
insertBefore, // <template end interpolate /> (will be removed)
ownerSupport, // owner
options, // {added:0, removed:0}
fragment) {
    const valueType = getValueType(value);
    switch (valueType) {
        case ValueTypes.templater:
            processTag(value, ownerSupport, subject, fragment);
            return;
        case ValueTypes.tag:
            const tag = value;
            let templater = tag.templater;
            if (!templater) {
                templater = tagFakeTemplater(tag);
            }
            processTag(templater, ownerSupport, subject, fragment);
            return;
        case ValueTypes.tagArray:
            return processTagArray(subject, value, insertBefore, ownerSupport, options, fragment);
        case ValueTypes.tagComponent:
            const newSupport = processSubjectComponent(value, subject, insertBefore, ownerSupport, options, fragment);
            return newSupport;
        case ValueTypes.function:
            const v = value;
            if (v.oneRender) {
                const support = oneRenderToSupport(v, subject, ownerSupport);
                renderTagOnly(support, support, subject, ownerSupport);
                processTag(support.templater, ownerSupport, subject, fragment);
                return;
            }
            break;
    }
    processFirstRegularValue(value, subject, subject.global.placeholder || insertBefore);
}
//# sourceMappingURL=processFirstSubjectValue.function.js.map