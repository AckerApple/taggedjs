import { getBaseSupport, upgradeBaseToSupport } from './createHtmlSupport.function.js';
export function createSupport(templater, // at runtime rendering of a tag, it needs to be married to a new Support()
subject, ownerSupport, // when not
appSupport, castedProps) {
    const support = getBaseSupport(templater, subject, castedProps);
    support.ownerSupport = ownerSupport || support;
    support.ownerSupport.appSupport = appSupport || support.ownerSupport;
    return upgradeBaseToSupport(templater, support, appSupport, castedProps);
}
//# sourceMappingURL=createSupport.function.js.map