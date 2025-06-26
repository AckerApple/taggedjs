import { getSupportInCycle } from '../tag/getSupportInCycle.function.js';
import { setUseMemory } from './setUseMemory.object.js';
import { state } from './state.function.js';
function getBlankDiffMemory() {
    return { stateDiff: 0, provider: undefined };
}
export const providers = {
    create: (constructMethod) => {
        const stateDiffMemory = state(getBlankDiffMemory);
        // mimic how many states were called the first time
        if (stateDiffMemory.stateDiff) {
            let x = stateDiffMemory.stateDiff;
            while (x--) {
                state(undefined);
            }
            const result = state(undefined);
            return result;
        }
        const result = state(() => {
            const stateConfig = setUseMemory.stateConfig;
            const oldStateCount = stateConfig.stateArray.length;
            // Providers with provider requirements just need to use providers.create() and providers.inject()
            const instance = constructMethod.prototype ? new constructMethod() : constructMethod();
            const support = stateConfig.support;
            const stateDiff = stateConfig.stateArray.length - oldStateCount;
            const provider = {
                constructMethod,
                instance,
                stateDiff,
                owner: support,
                children: [],
            };
            stateDiffMemory.provider = provider;
            const global = support.context.global;
            const providers = global.providers = global.providers || [];
            providers.push(provider);
            stateDiffMemory.stateDiff = stateDiff;
            return instance;
        });
        const cm = constructMethod;
        const compareTo = cm.compareTo = cm.toString();
        stateDiffMemory.provider.constructMethod.compareTo = compareTo;
        return result;
    },
    /**
     * @template T
     * @param {(new (...args: any[]) => T) | () => T} constructor
     * @returns {T}
     */
    inject: providerInject
};
function providerInject(constructor) {
    // find once, return same every time after
    return state(function providerInjectState() {
        // const memory = setUse.memory
        const cm = constructor;
        const compareTo = cm.compareTo = cm.compareTo || constructor.toString();
        const support = getSupportInCycle(); // memory.stateConfig.support as AnySupport
        const providers = [];
        let owner = {
            ownerSupport: support.ownerSupport
        };
        while (owner.ownerSupport) {
            const ownGlobal = owner.ownerSupport.context.global;
            const ownerProviders = ownGlobal.providers;
            if (!ownerProviders) {
                owner = owner.ownerSupport; // cause reloop checking next parent
                continue;
            }
            const provider = ownerProviders.find(provider => {
                providers.push(provider);
                const constructorMatch = provider.constructMethod.compareTo === compareTo;
                if (constructorMatch) {
                    return true;
                }
            });
            if (provider) {
                const global = support.context.global;
                const providers = global.providers = global.providers || [];
                providers.push(provider);
                provider.children.push(support);
                return provider.instance;
            }
            owner = owner.ownerSupport; // cause reloop checking next parent
        }
        const msg = `Could not inject provider: ${constructor.name} ${constructor}`;
        console.warn(`${msg}. Available providers`, providers);
        throw new Error(msg);
    });
}
//# sourceMappingURL=providers.js.map