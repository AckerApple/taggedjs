import { getBaseSupport, upgradeBaseToSupport } from './createHtmlSupport.function.js';
export function createSupport(templater, // at runtime rendering of a tag, it needs to be married to a new Support()
ownerSupport, appSupport, subject, castedProps) {
    const support = getBaseSupport(templater, subject, castedProps);
    support.ownerSupport = ownerSupport;
    return upgradeBaseToSupport(templater, support, appSupport, castedProps);
}
//# sourceMappingURL=createSupport.function.js.map