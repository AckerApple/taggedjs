import { Support } from '../Support.class.js';
import { TemplaterResult } from '../TemplaterResult.class.js';
import { isTagClass, isTagTemplater } from '../../isInstance.js';
import { processTagArray } from './processTagArray.js';
import { updateExistingTagComponent } from './updateExistingTagComponent.function.js';
import { processRegularValue } from './processRegularValue.function.js';
import { checkDestroyPrevious } from '../checkDestroyPrevious.function.js';
import { processSubjectComponent } from './processSubjectComponent.function.js';
import { isLikeTags } from '../isLikeTags.function.js';
import { getFakeTemplater, processTag, setupNewSupport } from './processTag.function.js';
import { swapInsertBefore } from '../setTagPlaceholder.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { getValueType } from '../getValueType.function.js';
export function updateExistingValue(subject, value, ownerSupport, insertBefore) {
    const valueType = getValueType(value);
    checkDestroyPrevious(subject, value, valueType);
    // handle already seen tag components
    if (valueType === ValueTypes.tagComponent) {
        return prepareUpdateToComponent(value, subject, insertBefore, ownerSupport);
    }
    // was component but no longer
    const support = subject.support;
    if (support) {
        if (valueType === ValueTypes.function) {
            return subject; // its a oneRender tag
        }
        handleStillTag(subject, value, ownerSupport);
        return subject;
    }
    switch (valueType) {
        case ValueTypes.tagArray:
            processTagArray(subject, value, insertBefore, // oldInsertBefore as InsertBefore,
            ownerSupport, { counts: {
                    added: 0,
                    removed: 0,
                } });
            return subject;
        case ValueTypes.templater:
            processTag(value, ownerSupport, subject);
            return subject;
        case ValueTypes.tag:
        case ValueTypes.dom:
            const tag = value;
            let templater = tag.templater;
            if (!templater) {
                templater = getFakeTemplater();
                tag.templater = templater;
                templater.tag = tag;
            }
            processTag(templater, ownerSupport, subject);
            return subject;
        case ValueTypes.subject:
            return value;
        // now its a useless function (we don't automatically call functions)
        case ValueTypes.function:
            if (!subject.global.placeholder) {
                subject.global.placeholder = swapInsertBefore(insertBefore);
            }
            return subject;
    }
    // This will cause all other values to render
    processRegularValue(value, subject, insertBefore);
    return subject;
}
function handleStillTag(subject, value, ownerSupport) {
    const lastSupport = subject.support;
    let templater = value;
    const isClass = isTagClass(value);
    if (isClass) {
        const tag = value;
        templater = tag.templater;
        if (!templater) {
            templater = new TemplaterResult([]);
            templater.tag = tag;
            tag.templater = templater;
        }
    }
    const valueSupport = new Support(templater, ownerSupport, subject);
    const isSameTag = value && isLikeTags(lastSupport, valueSupport);
    if (isTagTemplater(value)) {
        setupNewSupport(valueSupport, ownerSupport, subject);
    }
    if (isSameTag) {
        // lastSupport.updateBy(valueSupport)
        // ??? recently changed from above
        lastSupport.subject.global.oldest.updateBy(valueSupport);
        return;
    }
    if (isSameTag) {
        return processTag(templater, ownerSupport, subject);
    }
    return processRegularValue(value, subject, subject.global.insertBefore);
}
function prepareUpdateToComponent(templater, subjectTag, insertBefore, ownerSupport) {
    // When last value was not a component
    if (!subjectTag.support) {
        processSubjectComponent(templater, subjectTag, insertBefore, ownerSupport, {
            counts: { added: 0, removed: 0 },
        });
        return subjectTag;
    }
    const support = new Support(templater, ownerSupport, subjectTag);
    const subjectSup = subjectTag.support;
    const prevSupport = subjectSup.subject.global.newest;
    if (prevSupport) {
        const newestState = prevSupport.state;
        support.state.length = 0;
        support.state.push(...newestState);
    }
    else {
        processSubjectComponent(templater, subjectTag, insertBefore, ownerSupport, { counts: { added: 0, removed: 0 } });
        return subjectTag;
    }
    subjectTag.global = subjectSup.subject.global;
    subjectTag.support = support;
    updateExistingTagComponent(ownerSupport, support, // latest value
    subjectTag, insertBefore);
    return subjectTag;
}
//# sourceMappingURL=updateExistingValue.function.js.map