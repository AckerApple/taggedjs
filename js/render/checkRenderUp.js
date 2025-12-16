import { hasPropsToOwnerChanged } from './renderSupport.function.js';
export function checkRenderUp(templater, support) {
    const global = support.context.global;
    if (global && global.deleted) {
        return false;
    }
    const selfPropChange = hasPropsToOwnerChanged(templater, support);
    // render owner up first and that will cause me to re-render
    if (selfPropChange) {
        return true;
    }
    return false;
}
//# sourceMappingURL=checkRenderUp.js.map