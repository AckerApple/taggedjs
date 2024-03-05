import { processSubjectComponent } from "./processSubjectComponent.function.js";
import { processTagResult } from "./processTagResult.function.js";
import { isTagArray, isTagComponent, isTagInstance } from "./isInstance.js";
import { processTagArray } from "./processTagArray.js";
import { TagSupport } from "./TagSupport.class.js";
import { updateBetweenTemplates } from "./interpolateTemplate.js";
import { ValueSubject } from "./ValueSubject.js";
import { processRegularValue } from "./processRegularValue.function.js";
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
    // Previously was simple value, now its a tag of some sort
    const resultTag = result;
    const clone = resultTag.clone;
    const noLongerSimpleValue = valueType !== ValueTypes.value && clone;
    if (noLongerSimpleValue) {
        destroySimpleValue(template, resultTag);
    }
    switch (valueType) {
        case ValueTypes.tag:
            return {
                clones: processTag(value, result, template, ownerTag, options)
            };
        case ValueTypes.tagArray:
            return {
                clones: processTagArray(result, value, template, ownerTag, options)
            };
        case ValueTypes.tagComponent:
            return {
                clones: processSubjectComponent(value, result, template, ownerTag, options)
            };
    }
    // *if processing WAS a tag BUT NOW its some other non-tag value
    if (result.tag) {
        return {
            clones: [],
            promise: processWasTag(value, result, template, options),
        };
    }
    return {
        clones: processRegularValue(value, result, template, ownerTag)
    };
}
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
        value.ownerTag = ownerTag;
    }
    result.template = template;
    const clones = processTagResult(value, result, // Function will attach result.tag
    template, options);
    return clones;
}
function processWasTag(value, result, // could be tag via result.tag,
template, // <template end interpolate /> (will be removed)
options) {
    const tag = result.tag;
    // put the template back
    const lastFirstChild = result.clone || template; // result.tag.clones[0] // template.lastFirstChild
    // const parentNode = lastFirstChild.parentNode || template.parentNode
    // put the template back down
    lastFirstChild.parentNode.insertBefore(template, lastFirstChild);
    const clone = updateBetweenTemplates(value, 
    // template // template, // this will be removed from document inside this function
    lastFirstChild);
    result.clone = clone;
    // cleanup old
    delete result.tag;
    /* destroy logic */
    const stagger = options.counts.removed;
    const promise = tag.destroy({ stagger }).then(animated => options.counts.removed = stagger + animated);
    /* end: destroy logic */
    return promise;
}
export function destroySimpleValue(template, resultTag) {
    const clone = resultTag.clone;
    const parent = clone.parentNode;
    parent.insertBefore(template, clone);
    parent.removeChild(clone);
    delete resultTag.clone;
}
//# sourceMappingURL=processSubjectValue.function.js.map