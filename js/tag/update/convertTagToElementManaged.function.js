import { Subject } from '../../index.js';
import { valueToTagJsVar } from '../../tagJsVars/index.js';
import { getOverrideTagVar } from './getOverrideTagVar.js';
export function convertTagToElementManaged(support, ownerSupport, subject) {
    const context = support.context;
    const newValue = support.returnValue; // context.returnValue
    // EXAMPLE: ['a','b'].map(x=> tag(() => [div,span]).key(x))
    /*
    if(Array.isArray(newValue)) {
      ;(newValue as any).key = (arrayValue: any) => keyTag(arrayValue, newValue)
    }
    */
    const tagJsVar = valueToTagJsVar(newValue);
    delete context.global;
    context.contexts = [];
    const newContext = {
        updateCount: 0,
        value: newValue,
        tagJsVar,
        destroy$: new Subject(),
        render$: new Subject(),
        placeholder: context.placeholder,
        // not important
        valueIndex: -1,
        withinOwnerElement: true,
        parentContext: context,
        contexts: context.contexts, // share contexts especially so providers properly crawl my available contexts
        // contexts: subject.contexts, // share contexts especially so providers properly crawl my available contexts
    };
    // context.contexts = [ newContext ] as ContextItem[] & SupportContextItem[]
    const overrideTagVar = getOverrideTagVar(context, newContext, support, subject);
    context.tagJsVar = overrideTagVar;
    // TODO: should we be calling this here?
    tagJsVar.processInit(newValue, newContext, support, subject.placeholder);
    return support;
}
//# sourceMappingURL=convertTagToElementManaged.function.js.map