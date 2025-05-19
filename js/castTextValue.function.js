import { empty } from './tag/ValueTypes.enum.js';
export function castTextValue(value) {
    switch (value) {
        case undefined:
        case false:
        case null:
            return empty;
    }
    return value;
}
//# sourceMappingURL=castTextValue.function.js.map