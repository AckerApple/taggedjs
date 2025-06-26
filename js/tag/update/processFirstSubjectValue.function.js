export function processFirstSubjectValue(value, contextItem, // could be tag via result.tag
ownerSupport, // owningSupport
counts, appendTo, insertBefore) {
    // const tagJsVar = valueToTagJsVar(value)
    // contextItem.tagJsVar = tagJsVar
    const tagJsVar = contextItem.tagJsVar;
    return tagJsVar.processInit(value, contextItem, ownerSupport, counts, appendTo, insertBefore);
}
//# sourceMappingURL=processFirstSubjectValue.function.js.map