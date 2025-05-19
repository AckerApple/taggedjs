import { BasicTypes, ImmutableTypes, ValueTypes } from './tag/ValueTypes.enum.js';
export function isSimpleType(value) {
    switch (value) {
        case ImmutableTypes.string:
        case ImmutableTypes.number:
        case ImmutableTypes.boolean:
            return true;
    }
    return false;
}
/** Indicates if tag() was used */
export function isStaticTag(value) {
    if (!value) {
        return false;
    }
    const tagJsType = value.tagJsType;
    switch (tagJsType) {
        case ValueTypes.dom:
        case ValueTypes.tag:
        case ValueTypes.templater:
            return true;
    }
    return false;
}
/** passed in is expected to be a TemplaterResult */
export function isTagComponent(value) {
    const tagType = value?.tagJsType;
    return tagType === ValueTypes.tagComponent || tagType === ValueTypes.stateRender;
}
// isSubjectLike
export function isSubjectInstance(subject) {
    return isObject(subject) && typeof subject.subscribe === BasicTypes.function;
}
export function isPromise(value) {
    return value && isFunction(value.then);
}
export function isFunction(value) {
    return typeof value === BasicTypes.function;
}
export function isObject(value) {
    return typeof (value) === BasicTypes.object && value !== null;
}
export function isArray(value) {
    return Array.isArray(value);
}
//# sourceMappingURL=isInstance.js.map