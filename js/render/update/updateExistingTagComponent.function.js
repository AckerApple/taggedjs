import { castProps } from '../../tag/props/alterProp.function.js';
import { syncPriorPropFunction } from '../../tag/update/syncPriorPropFunction.function.js';
export function syncFunctionProps(newSupport, oldSupport, ownerSupport, newPropsArray, // templater.props
maxDepth, depth = -1) {
    const subject = oldSupport.context;
    const global = subject.global;
    if (!global || !subject.state.newest) {
        const castedProps = castProps(newPropsArray, newSupport, depth);
        newPropsArray.push(...castedProps);
        const propsConfig = newSupport.propsConfig;
        propsConfig.castProps = castedProps;
        return newPropsArray;
    }
    const newest = subject.state.newest;
    oldSupport = newest || oldSupport;
    const priorPropConfig = oldSupport.propsConfig;
    const priorPropsArray = priorPropConfig.castProps;
    const newArray = [];
    for (let index = 0; index < newPropsArray.length; ++index) {
        const prop = newPropsArray[index];
        const priorProp = priorPropsArray[index];
        const newValue = syncPriorPropFunction(priorProp, prop, newSupport, ownerSupport, maxDepth, depth + 1);
        newArray.push(newValue);
    }
    const newPropsConfig = newSupport.propsConfig;
    newPropsConfig.castProps = newArray;
    return newArray;
}
export function moveProviders(oldSupport, newSupport) {
    const context = oldSupport.context;
    const global = context.global;
    let pIndex = -1;
    const providers = context.providers = context.providers || [];
    const pLen = providers.length - 1;
    while (pIndex++ < pLen) {
        const provider = providers[pIndex];
        let index = -1;
        const pcLen = provider.children.length - 1;
        while (index++ < pcLen) {
            const child = provider.children[index];
            const wasSameGlobals = global === child.context.global;
            if (wasSameGlobals) {
                provider.children.splice(index, 1);
                provider.children.push(newSupport);
                return;
            }
        }
    }
}
//# sourceMappingURL=updateExistingTagComponent.function.js.map