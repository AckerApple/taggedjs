import { deepClone } from '../deepFunctions.js';
import { ValueTypes } from './ValueTypes.enum.js';
import { getValueType } from './getValueType.function.js';
export function cloneValueArray(values) {
    return values.map(cloneTagJsValue);
}
export function cloneTagJsValue(value) {
    const tag = value;
    switch (getValueType(value)) {
        case ValueTypes.tagComponent:
            const tagComponent = value;
            return deepClone(tagComponent.props);
        case ValueTypes.dom:
        case ValueTypes.tag:
        case ValueTypes.templater:
            return cloneValueArray(tag.values);
        case ValueTypes.tagArray:
            return cloneValueArray(tag);
    }
    return deepClone(value);
}
//# sourceMappingURL=cloneValueArray.function.js.map