import { ValueTypes } from './ValueTypes.enum.js';
import { processTagInit } from './update/processTagInit.function.js';
import { checkTagValueChangeAndUpdate } from './checkTagValueChange.function.js';
import { destroySupportByContextItem } from './destroySupportByContextItem.function.js';
import { tagValueUpdateHandler } from './update/tagValueUpdateHandler.function.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
export function getTemplaterResult(propWatch, props) {
    const templater = {
        tagJsType: ValueTypes.templater,
        processInit: processTagInit,
        processInitAttribute: blankHandler,
        processUpdate: tagValueUpdateHandler,
        hasValueChanged: checkTagValueChangeAndUpdate,
        destroy: destroySupportByContextItem,
        propWatch,
        props,
        key: function keyTemplate(arrayValue) {
            templater.arrayValue = arrayValue;
            return templater;
        },
        matchesInjection(inject, context) {
            if (templater.wrapper === inject) {
                return context;
            }
            if (templater.wrapper?.original === inject?.original) {
                return context;
            }
        }
    };
    return templater;
}
//# sourceMappingURL=getTemplaterResult.function.js.map