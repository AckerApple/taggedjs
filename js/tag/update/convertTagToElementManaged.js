import { Subject } from '../..';
import { valueToTagJsVar } from '../../tagJsVars';
import { getOverrideTagVar } from './processFirstSubjectComponent.function';
export function convertTagToElementManaged(support, ownerSupport, subject) {
    const context = support.context;
    const newValue = context.toRender || context.returnValue;
    // EXAMPLE: ['a','b'].map(x=> tag(() => [div,span]).key(x))
    /*
    if(Array.isArray(newValue)) {
      ;(newValue as any).key = (arrayValue: any) => keyTag(arrayValue, newValue)
    }
    */
    const tagJsVar = valueToTagJsVar(newValue);
    delete context.global;
    const newContext = {
        updateCount: 0,
        value: newValue,
        tagJsVar,
        destroy$: new Subject(),
        placeholder: context.placeholder,
        // not important
        valueIndex: -1,
        withinOwnerElement: true,
        parentContext: context,
    };
    const overrideTagVar = getOverrideTagVar(context, newContext, support, subject);
    context.tagJsVar = overrideTagVar;
    // TODO: should we be calling this here?
    tagJsVar.processInit(newValue, newContext, support, subject.placeholder);
    return support;
}
//# sourceMappingURL=convertTagToElementManaged.js.map