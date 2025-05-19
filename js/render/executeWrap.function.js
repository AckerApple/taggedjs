import { BasicTypes, ValueTypes } from '../tag/ValueTypes.enum.js';
import { setUseMemory } from '../state/setUseMemory.object.js';
export function executeWrap(templater, result, useSupport, castedProps) {
    const originalFunction = result.original; // (innerTagWrap as any).original as unknown as TagComponent
    const stateless = templater.tagJsType === ValueTypes.stateRender;
    const config = setUseMemory.stateConfig;
    config.support = useSupport;
    let tag;
    if (stateless) {
        tag = templater();
    }
    else {
        tag = originalFunction(...castedProps);
        // CALL ORIGINAL COMPONENT FUNCTION
        if (typeof (tag) === BasicTypes.function) {
            tag = tag();
        }
    }
    tag.templater = templater;
    templater.tag = tag;
    useSupport.state = config.stateArray;
    useSupport.states = config.states;
    // useSupport.states = [...config.states]
    return useSupport;
}
//# sourceMappingURL=executeWrap.function.js.map