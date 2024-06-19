import { ValueTypes } from './tag/ValueTypes.enum.js';
export function isStaticTag(value) {
    return [
        ValueTypes.dom,
        ValueTypes.tag,
        ValueTypes.templater,
    ].includes(value?.tagJsType);
}
export function isTagTemplater(value) {
    return value?.tagJsType === ValueTypes.templater;
}
// TODO: whats the difference between isTagClass and isTagComponent
export function isTagComponent(value) {
    return value?.tagJsType === ValueTypes.tagComponent;
}
export function isTagClass(value) {
    const tagJsType = value?.tagJsType;
    return tagJsType && [ValueTypes.tag, ValueTypes.dom].includes(tagJsType);
}
// isSubjectLike
export function isSubjectInstance(subject) {
    const isSubject = subject?.isSubject === true;
    return (isSubject || subject?.subscribe) ? true : false; // subject?.isSubject === true || 
}
export function isTagArray(value) {
    return value instanceof Array && value.every(x => [
        ValueTypes.tag,
        ValueTypes.templater,
        ValueTypes.dom,
        ValueTypes.tagComponent
    ].includes(x?.tagJsType));
}
//# sourceMappingURL=isInstance.js.map