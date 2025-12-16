// taggedjs-no-compile
import { addOneContext } from '../addOneContext.function.js';
import { getSupportWithState } from '../../interpolations/attributes/getSupportWithState.function.js';
export function processTagJsVarAttribute(value, contexts, parentContext, tagJsVar, varIndex, support, element, isNameVar) {
    if (!contexts) {
        throw new Error('most like an issue');
    }
    const contextItem = addOneContext(value, contexts, true, parentContext);
    contextItem.element = element;
    contextItem.valueIndex = varIndex;
    contextItem.isAttr = true;
    contextItem.isNameOnly = isNameVar;
    contextItem.stateOwner = getSupportWithState(support);
    contextItem.supportOwner = support;
    contextItem.oldTagJsVar = contextItem.tagJsVar;
    contextItem.tagJsVar = tagJsVar;
    return contextItem;
}
//# sourceMappingURL=processTagJsVarAttribute.function.js.map