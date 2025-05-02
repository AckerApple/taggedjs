import { ValueTypes } from './ValueTypes.enum.js';
import { processTagInit } from './update/processTagInit.function.js';
export function getTemplaterResult(propWatch, props) {
    const templater = {
        tagJsType: ValueTypes.templater,
        processInit: processTagInit,
        propWatch,
        props,
        key: function keyTemplate(arrayValue) {
            templater.arrayValue = arrayValue;
            return templater;
        }
    };
    return templater;
}
//# sourceMappingURL=getTemplaterResult.function.js.map