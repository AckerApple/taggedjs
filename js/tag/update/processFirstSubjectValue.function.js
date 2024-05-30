import { processSubjectComponent } from './processSubjectComponent.function.js';
import { processTagArray } from './processTagArray.js';
import { TemplaterResult } from '../TemplaterResult.class.js';
import { processFirstRegularValue } from './processRegularValue.function.js';
import { newTagSupportByTemplater, processTag, tagFakeTemplater } from './processTag.function.js';
import { getValueType } from './processFirstSubject.utils.js';
import { renderTagOnly } from '../render/renderTagOnly.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
export function processFirstSubjectValue(value, subject, // could be tag via result.tag
insertBefore, // <template end interpolate /> (will be removed)
ownerSupport, // owner
options) {
    const valueType = getValueType(value);
    switch (valueType) {
        case ValueTypes.templater:
            processTag(value, insertBefore, ownerSupport, subject);
            return;
        case ValueTypes.tag:
            const tag = value;
            let templater = tag.templater;
            if (!templater) {
                templater = tagFakeTemplater(tag);
            }
            processTag(templater, insertBefore, ownerSupport, subject);
            return;
        case ValueTypes.tagArray:
            return processTagArray(subject, value, insertBefore, ownerSupport, options);
        case ValueTypes.tagComponent:
            processSubjectComponent(value, subject, insertBefore, ownerSupport, options);
            return;
        case ValueTypes.function:
            const v = value;
            if (v.oneRender) {
                const tagSupport = oneRenderToTagSupport(v, subject, ownerSupport);
                renderTagOnly(tagSupport, tagSupport, subject, ownerSupport);
                processTag(tagSupport.templater, insertBefore, ownerSupport, subject);
                return;
            }
            break;
    }
    processFirstRegularValue(value, subject, insertBefore);
}
export function oneRenderToTagSupport(wrapper, subject, ownerSupport) {
    const templater = new TemplaterResult([]);
    templater.tagJsType = 'oneRender';
    const tagSupport = newTagSupportByTemplater(templater, ownerSupport, subject);
    let tag;
    const wrap = () => {
        templater.tag = tag || (wrapper());
        return tagSupport;
    };
    templater.wrapper = wrap;
    wrap.parentWrap = wrap;
    wrap.oneRender = true;
    wrap.parentWrap.original = wrapper;
    return tagSupport;
}
//# sourceMappingURL=processFirstSubjectValue.function.js.map