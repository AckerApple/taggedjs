import { paintBeforeText, paintCommands } from './render/paint.function.js';
import { empty } from './tag/ValueTypes.enum.js';
// Function to update the value of x
export function updateBeforeTemplate(value, // value should be casted before calling here
lastFirstChild, subject) {
    paintCommands.push({
        processor: paintBeforeText,
        args: [lastFirstChild, value, (x) => subject.simpleValueElm = x],
    });
}
export function castTextValue(value) {
    switch (value) {
        case undefined:
        case false:
        case null:
            return empty;
    }
    return value;
}
//# sourceMappingURL=updateBeforeTemplate.function.js.map