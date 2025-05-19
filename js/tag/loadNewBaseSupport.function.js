import { getBaseSupport, upgradeBaseToSupport } from './createHtmlSupport.function.js';
export function loadNewBaseSupport(templater, subject, appElement) {
    const global = subject.global;
    const newSupport = getBaseSupport(templater, subject);
    upgradeBaseToSupport(templater, newSupport, newSupport);
    newSupport.appElement = appElement;
    global.oldest = global.oldest || newSupport;
    global.newest = newSupport;
    return newSupport;
}
//# sourceMappingURL=loadNewBaseSupport.function.js.map