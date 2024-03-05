import { updateBetweenTemplates } from "./interpolateTemplate.js";
export function processRegularValue(value, result, // could be tag via result.tag
template, // <template end interpolate /> (will be removed)
ownerTag) {
    const before = result.clone || template; // Either the template is on the doc OR its the first element we last put on doc
    result.template = template;
    // Processing of regular values
    const clone = updateBetweenTemplates(value, before);
    result.clone = clone; // remember single element put down, for future updates
    const clones = [];
    const oldPos = ownerTag.clones.indexOf(before); // is the insertBefore guide being considered one of the tags clones?
    const isOnlyGuideInClones = oldPos >= 0 && !ownerTag.clones.includes(clone);
    const exchangeGuideForClone = isOnlyGuideInClones && !before.parentNode; // guide is in clones AND guide is not on the document
    if (exchangeGuideForClone) {
        ownerTag.clones.splice(oldPos, 1); // remove insertBefore guide from tag
        ownerTag.clones.push(clone); // exchange guide for element actually on document
        clones.push(clone); // record the one element that in the end is on the document
    }
    return clones;
}
//# sourceMappingURL=processRegularValue.function.js.map