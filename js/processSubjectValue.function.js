import { processSubjectComponent } from './processSubjectComponent.function';
import { processTagResult } from './processTagResult.function';
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
export function processSubjectValue(value, result, // could be tag via result.tag
template, // <template end interpolate /> (will be removed)
ownerTag, // owner
options) {
    const valueType = getValueType(value);
    switch (valueType) {
        case ValueTypes.tag:
            processTag(value, result, template, ownerTag, options);
            return [];
        case ValueTypes.tagArray:
            return processTagArray(result, value, template, ownerTag, options);
        case ValueTypes.tagComponent:
            processSubjectComponent(value, result, template, ownerTag, options);
            return [];
    }
    return processRegularValue(value, result, template);
}
/** Could be a regular tag or a component. Both are Tag.class */
export function processTag(value, result, // could be tag via result.tag
template, // <template end interpolate /> (will be removed)
ownerTag, // owner
options) {
    // first time seeing this tag?
    if (!value.tagSupport) {
        value.tagSupport = new TagSupport({}, // the template is provided via html`` call
        new ValueSubject([]));
        // asking me to render will cause my parent to render
        value.tagSupport.mutatingRender = () => {
            ownerTag.tagSupport.render();
        };
        value.tagSupport.oldest = value.tagSupport.oldest || value;
        ownerTag.children.push(value);
    }
    value.ownerTag = ownerTag;
    result.template = template;
    processTagResult(value, result, // Function will attach result.tag
    template, options);
}
//# sourceMappingURL=processSubjectValue.function.js.map