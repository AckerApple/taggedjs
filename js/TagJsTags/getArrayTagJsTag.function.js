import { checkArrayValueChange } from '../tag/checkDestroyPrevious.function.js';
import { processTagArray } from '../tag/update/arrays/processTagArray.js';
import { tagValueUpdateHandler } from '../tag/update/tagValueUpdateHandler.function.js';
import { blankHandler } from '../render/dom/blankHandler.function.js';
import { destroyArrayContext } from '../tag/destroyArrayContext.function.js';
import { updateToDiffValue } from '../tag/update/updateToDiffValue.function.js';
/** how to process an array */
export function getArrayTagVar(value) {
    return {
        component: false,
        tagJsType: 'array',
        value,
        processInitAttribute: blankHandler,
        processInit: processArrayInit,
        processUpdate: processArrayUpdates,
        hasValueChanged: checkArrayValueChange,
        destroy: destroyArrayContext,
    };
}
function processArrayUpdates(newValue, contextItem, ownerSupport) {
    ++contextItem.updateCount;
    const TagJsTag = contextItem.tagJsVar;
    const ignoreOrDestroyed = TagJsTag.hasValueChanged(newValue, contextItem, ownerSupport);
    if (ignoreOrDestroyed) {
        destroyArrayContext(contextItem);
        updateToDiffValue(newValue, contextItem, ownerSupport, ignoreOrDestroyed);
        return ignoreOrDestroyed;
    }
    // ignore
    /*
    if( ignoreOrDestroyed === 0 ) {
      return ignoreOrDestroyed // do nothing
    }
    /*
  /*
    updateToDiffValue(
      newValue,
      contextItem,
      ownerSupport,
      ignoreOrDestroyed,
    )
  
    return ignoreOrDestroyed
  */
    if (Array.isArray(newValue)) {
        processTagArray(contextItem, newValue, ownerSupport);
        return 0;
    }
    const tagUpdateResponse = tagValueUpdateHandler(newValue, contextItem, ownerSupport);
    if (tagUpdateResponse === 0) {
        processTagArray(contextItem, newValue, ownerSupport);
        return 0;
    }
    return 1;
}
function processArrayInit(value, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem, ownerSupport, _insertBefore, appendTo) {
    const subValue = value;
    processTagArray(contextItem, subValue, ownerSupport, appendTo);
}
//# sourceMappingURL=getArrayTagJsTag.function.js.map