import { ValueTypes } from '../ValueTypes.enum.js';
import { updateToDiffValue } from './updateToDiffValue.function.js';
export function checkSubContext(newValue, contextItem, ownerSupport, counts) {
    const subContext = contextItem.subContext;
    const hasChanged = handleTagTypeChangeFrom(ValueTypes.subscribe, newValue, ownerSupport, contextItem, // subContext as any as ContextItem, // contextItem,
    counts);
    if (hasChanged) {
        return hasChanged;
    }
    if (!subContext || !subContext.hasEmitted) {
        return -1;
    }
    subContext.tagJsVar = newValue;
    subContext.valuesHandler(subContext.lastValues, 0);
    return -1;
}
/** used when an variable produces a result of another sub-variable such as with subscribe()
 * - Actually might be used to tell if a main variable has changed like changing one subscribe to another
 */
export function handleTagTypeChangeFrom(originalType, newValue, ownerSupport, contextItem, // NOT the subContext
counts) {
    // const currentType = tagJsVar.tagJsType
    // const currentType = (newValue as TagJsVar)?.tagJsType
    // const isDifferent = currentType !== originalType
    const isDifferent = !newValue || !newValue.tagJsType || newValue.tagJsType !== originalType;
    if (isDifferent) {
        const tagJsVar = contextItem.tagJsVar;
        tagJsVar.delete(contextItem, ownerSupport);
        // const tagJsVar = subSubContext.tagJsVar as TagJsVar
        // tagJsVar.delete(subSubContext, ownerSupport)
        updateToDiffValue(newValue, contextItem, // subSubContext,
        ownerSupport, 99, counts);
        return 99;
    }
    /*
      if( isArray(newValue) ) {
        console.log('--------> updating array', {
          newValue,
          subSubContext,
          lastArray: subSubContext.lastArray,
        })
        processTagArray(
          subSubContext,
          newValue as (TemplaterResult | Tag)[],
          ownerSupport,
          counts,
        )
      }
    */
}
//# sourceMappingURL=checkSubContext.function.js.map