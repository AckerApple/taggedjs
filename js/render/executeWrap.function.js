import { BasicTypes, ValueTypes } from '../tag/ValueTypes.enum.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
import { setSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js';
import { removeContextInCycle } from '../tag/cycles/setContextInCycle.function.js';
export function executeWrap(templater, result, useSupport, castedProps) {
    const originalFunction = result.original; // (innerTagWrap as any).original as unknown as TagComponent
    const stateless = templater.tagJsType === ValueTypes.stateRender;
    const config = setUseMemory.stateConfig;
    setSupportInCycle(useSupport);
    let tag;
    if (stateless) {
        tag = templater();
    }
    else {
        tag = originalFunction(...castedProps);
        // tag returns another function expected to be called
        if (typeof (tag) === BasicTypes.function && tag.tagJsType === undefined) {
            tag = tag();
        }
    }
    useSupport.context.returnValue = tag;
    useSupport.returnValue = tag;
    tag.templater = templater;
    templater.tag = tag;
    useSupport.context.state.newer = { ...config };
    removeContextInCycle();
    return useSupport;
}
//# sourceMappingURL=executeWrap.function.js.map