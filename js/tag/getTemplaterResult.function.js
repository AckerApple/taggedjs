import { ValueTypes } from './ValueTypes.enum.js';
import { processTagInit } from './update/processTagInit.function.js';
import { checkTagValueChange, destroySupportByContextItem } from './checkTagValueChange.function.js';
import { tagValueUpdateHandler } from './update/tagValueUpdateHandler.function.js';
export function getTemplaterResult(propWatch, props) {
    const templater = {
        tagJsType: ValueTypes.templater,
        processInit: processTagInit,
        processUpdate: tagValueUpdateHandler,
        checkValueChange: checkTagValueChange,
        delete: destroySupportByContextItem,
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