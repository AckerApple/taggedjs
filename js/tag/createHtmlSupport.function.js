import { clonePropsBy } from './props/clonePropsBy.function.js';
/** used only for apps, otherwise use Support */
export function getBaseSupport(templater, context, castedProps) {
    const baseSupport = {
        templater,
        context,
        castedProps,
        appSupport: undefined,
    };
    const global = context.global;
    global.blocked = [];
    // context.state.newer = context.state.newer || { ...setUseMemory.stateConfig }
    if (!context.state) {
        context.state = {
            newer: {
                state: [],
                states: [],
            }
        };
    }
    return baseSupport;
}
/** Sets support states to empty array and clones props */
export function upgradeBaseToSupport(templater, // at runtime rendering of a tag, it needs to be married to a new Support()
support, // when appSupport not defined then this support becomes appSupport
appSupport, castedProps) {
    support.appSupport = appSupport || support;
    const props = templater.props; // natural props
    if (props) {
        support.propsConfig = clonePropsBy(support, props, castedProps);
    }
    return support;
}
export function createHtmlSupport(templater, // at runtime rendering of a tag, it needs to be married to a new Support()
ownerSupport, appSupport, context, castedProps) {
    const support = {
        templater,
        context,
        castedProps,
        appSupport: undefined,
    };
    support.ownerSupport = ownerSupport;
    support.appSupport = appSupport;
    return support;
}
//# sourceMappingURL=createHtmlSupport.function.js.map