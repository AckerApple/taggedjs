import { processSubjectComponent } from "./processSubjectComponent.function.js";
import { processTagResult } from "./processTagResult.function.js";
import { isTagComponent, isTagInstance } from "./isInstance.js";
import { processTagArray } from "./processTagArray.js";
import { getTagSupport } from "./getTagSupport.js";
import { updateBetweenTemplates } from "./interpolateTemplate.js";
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
    if (value instanceof Array && value.every(x => isTagInstance(x))) {
        return ValueTypes.tagArray;
    }
    return ValueTypes.value;
}
export function processSubjectValue(value, result, // could be tag via result.tag
template, // <template end interpolate /> (will be removed)
tag, // owner
options) {
    const valueType = getValueType(value);
    // Previously was simple value, now its a tag of some sort
    if (valueType !== ValueTypes.value && result.clone) {
        const clone = result.clone;
        const parent = clone.parentNode;
        template.removeAttribute('removedAt');
        parent.insertBefore(template, clone);
        parent.removeChild(clone);
        delete result.clone;
        // result.clone = template
    }
    switch (valueType) {
        case ValueTypes.tag:
            return {
                clones: processTag(value, result, template, tag, options)
            };
        case ValueTypes.tagArray:
            return {
                clones: processTagArray(result, value, template, tag, options)
            };
        case ValueTypes.tagComponent:
            return {
                clones: processSubjectComponent(value, result, template, tag, options)
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
        clones: processRegularValue(value, result, template, tag)
    };
}
function processRegularValue(value, result, // could be tag via result.tag
template, // <template end interpolate /> (will be removed)
tag) {
    const before = result.clone || template; // Either the template is on the doc OR its the first element we last put on doc
    // Processing of regular values
    const clone = updateBetweenTemplates(value, before);
    result.clone = clone; // remember single element put down, for future updates
    const clones = [];
    const oldPos = tag.clones.indexOf(before); // is the insertBefore guide being considered one of the tags clones?
    const isOnlyGuideInClones = oldPos >= 0 && !tag.clones.includes(clone);
    const exchangeGuideForClone = isOnlyGuideInClones && !before.parentNode; // guide is in clones AND guide is not on the document
    if (exchangeGuideForClone) {
        tag.clones.splice(oldPos, 1); // remove insertBefore guide from tag
        tag.clones.push(clone); // exchange guide for element actually on document
        clones.push(clone); // record the one element that in the end is on the document
    }
    return clones;
}
function processTag(value, result, // could be tag via result.tag
template, // <template end interpolate /> (will be removed)
tag, // owner
options) {
    // first time seeing this tag?
    if (!value.tagSupport) {
        value.tagSupport = getTagSupport(tag.tagSupport.depth + 1, {});
        // asking me to render will cause my parent to render
        value.tagSupport.mutatingRender = tag.tagSupport.mutatingRender;
        value.tagSupport.oldest = value.tagSupport.oldest || value;
        tag.children.push(value);
        value.ownerTag = tag;
    }
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
    // cleanup old
    if (result.clone) {
        result.clone.parentNode.removeChild(result.clone);
    }
    delete result.tag;
    const stagger = options.counts.removed;
    const promise = tag.destroy({ stagger }).then(animated => options.counts.removed = stagger + animated);
    delete result.tag;
    const clone = updateBetweenTemplates(value, template);
    result.clone = clone;
    return promise;
}
//# sourceMappingURL=processSubjectValue.function.js.map