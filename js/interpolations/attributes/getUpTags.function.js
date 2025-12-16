import { isTagComponent } from "../../isInstance.js";
import { providersChangeCheck } from "../../state/providersChangeCheck.function.js";
import { isInlineHtml } from "../../render/renderSupport.function.js";
import { ValueTypes } from "../../tag/ValueTypes.enum.js";
import { checkRenderUp } from "../../render/checkRenderUp.function.js";
export function getUpTags(support, supports = []) {
    const subject = support.context;
    // const global = support.context.global as SupportTagGlobal
    const templater = support.templater;
    const inlineHtml = isInlineHtml(templater);
    const ownerSupport = support.ownerSupport;
    if (subject.locked) {
        supports.push(support);
        return supports;
    }
    // is it just a vanilla tag, not component?
    if (inlineHtml) {
        return getUpTags(ownerSupport, supports);
    }
    const global = support.context.global;
    if (global && global.deleted === true) {
        return supports;
    }
    const newSupport = support; // global.newest as AnySupport
    const isComponent = isTagComponent(newSupport.templater);
    const tagJsType = support.templater.tagJsType;
    const canContinueUp = ownerSupport && tagJsType !== ValueTypes.stateRender;
    const continueUp = canContinueUp && (!isComponent || checkRenderUp(newSupport.templater, newSupport));
    const providers = newSupport.context.providers;
    if (providers) {
        const proSupports = providersChangeCheck(newSupport);
        supports.push(...proSupports);
    }
    if (continueUp) {
        getUpTags(ownerSupport, supports);
        if (isComponent) {
            supports.push(newSupport);
        }
        return supports; // more to keep going up, do not push this child for review
    }
    supports.push(newSupport);
    return supports;
}
//# sourceMappingURL=getUpTags.function.js.map