// taggedjs-no-compile
import { setNonFunctionInputValue } from '../../interpolations/attributes/howToSetInputValue.function.js';
import { getNewContext } from '../addOneContext.function.js';
import { removeContextInCycle, setContextInCycle } from '../../tag/cycles/setContextInCycle.function.js';
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js';
/** adds onto parent.contexts */
export function processTagJsTagAttribute(value, contexts, parentContext, tagJsVar, varIndex, support, attrName, element, isNameVar) {
    // getOneContext
    const contextItem = getNewContext(value, contexts || [], true, parentContext);
    contextItem.target = element;
    contextItem.valueIndex = varIndex;
    contextItem.isAttr = true;
    contextItem.isNameOnly = isNameVar;
    contextItem.stateOwner = getSupportWithState(support);
    contextItem.supportOwner = support;
    setContextInCycle(contextItem);
    tagJsVar.processInitAttribute(attrName, value, // TagJsTag,
    element, tagJsVar, contextItem, support, setNonFunctionInputValue);
    removeContextInCycle();
    contextItem.oldTagJsVar = contextItem.tagJsVar;
    contextItem.tagJsVar = tagJsVar;
    return contextItem;
}
//# sourceMappingURL=processTagJsAttribute.function.js.map