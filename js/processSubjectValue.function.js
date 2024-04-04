import { processSubjectComponent } from './processSubjectComponent.function';
import { isTagArray, isTagComponent, isTagInstance } from './isInstance';
import { processTagArray } from './processTagArray';
import { TagSupport } from './TagSupport.class';
import { ValueSubject } from './ValueSubject';
import { processRegularValue } from './processRegularValue.function';
var ValueTypes;
(function (ValueTypes) {
    ValueTypes["tag"] = "tag";
    ValueTypes["tagArray"] = "tag-array";
    ValueTypes["tagComponent"] = "tag-component";
    ValueTypes["value"] = "value";
})(ValueTypes || (ValueTypes = {}));
function getValueType(value) {
    if (isTagComponent(value)) {
        return ValueTypes.tagComponent;
    }
    if (isTagInstance(value)) {
        return ValueTypes.tag;
    }
    if (isTagArray(value)) {
        return ValueTypes.tagArray;
    }
    return ValueTypes.value;
}
export function processSubjectValue(value, subject, // could be tag via result.tag
template, // <template end interpolate /> (will be removed)
ownerTag, // owner
options) {
    const valueType = getValueType(value);
    switch (valueType) {
        case ValueTypes.tag:
            processTag(value, subject, template, ownerTag);
            return;
        case ValueTypes.tagArray:
            return processTagArray(subject, value, template, ownerTag, options);
        case ValueTypes.tagComponent:
            processSubjectComponent(value, subject, template, ownerTag, options);
            return;
    }
    processRegularValue(value, subject, template);
}
/** Could be a regular tag or a component. Both are Tag.class */
export function processTag(tag, subject, // could be tag via result.tag
insertBefore, // <template end interpolate /> (will be removed)
ownerTag) {
    // first time seeing this tag?
    if (!tag.tagSupport) {
        if (!isTagInstance(tag)) {
            throw new Error('issue non-tag here');
        }
        applyFakeTemplater(tag, ownerTag, subject);
        if (ownerTag.childTags.find(x => x === tag)) {
            throw new Error('about to reattach tag already present - 5');
        }
        ownerTag.childTags.push(tag);
    }
    tag.ownerTag = ownerTag;
    subject.template = insertBefore;
    tag.buildBeforeElement(insertBefore, {
        counts: { added: 0, removed: 0 },
        forceElement: true, test: false,
    });
}
export function applyFakeTemplater(tag, ownerTag, subject) {
    if (!ownerTag) {
        throw new Error('no owner error');
    }
    const fakeTemplater = getFakeTemplater();
    tag.tagSupport = new TagSupport(ownerTag.tagSupport, fakeTemplater, // the template is provided via html`` call
    subject);
    fakeTemplater.global.oldest = tag;
    fakeTemplater.global.newest = tag;
    fakeTemplater.tagSupport = tag.tagSupport;
    // asking me to render will cause my parent to render
    tag.ownerTag = ownerTag;
}
function getFakeTemplater() {
    return {
        global: {
            renderCount: 0,
            providers: [],
            context: {},
        },
        children: new ValueSubject([]), // no children
        props: {},
        isTag: true,
    };
}
//# sourceMappingURL=processSubjectValue.function.js.map