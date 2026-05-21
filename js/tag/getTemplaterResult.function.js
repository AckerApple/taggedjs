import { ValueTypes } from './ValueTypes.enum.js';
import { checkTagValueChangeAndUpdate } from './checkTagValueChange.function.js';
import { destroySupportByContextItem } from './destroySupportByContextItem.function.js';
import { tagValueUpdateHandler } from './update/tagValueUpdateHandler.function.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
import { elementVarToHtmlString } from '../elements/elementVarToHtmlString.function.js';
export function getTemplaterResult(propWatch, props) {
    const templater = {
        component: false,
        tagJsType: ValueTypes.templater,
        processInit: '', // processTagInit,
        processInitAttribute: blankHandler,
        processUpdate: tagValueUpdateHandler,
        hasValueChanged: checkTagValueChangeAndUpdate,
        destroy: destroySupportByContextItem,
        propWatch,
        props,
        get outerHTML() {
            return elementVarToHtmlString(this);
        },
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