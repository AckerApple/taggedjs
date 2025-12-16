import { checkSubContext } from './checkSubContext.function';
export function processUpdateSubscribe(newValue, tagJsVar, contextItem, ownerSupport, counts) {
    const subContext = contextItem.subContext;
    const lastValues = subContext?.lastValues;
    const subValue = lastValues[0].value;
    const subTagJsVar = lastValues[0].tagJsVar;
    console.log('processUpdateSubscribe', {
        newValue,
        valueOf: newValue?.value,
        lastValues,
        x: contextItem.subContext?.lastValues
    });
    checkSubContext(subValue, subTagJsVar, contextItem, ownerSupport, counts);
}
//# sourceMappingURL=processUpdateSubscribe.js.map