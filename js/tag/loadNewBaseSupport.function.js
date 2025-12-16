import { getBaseSupport, upgradeBaseToSupport } from './createHtmlSupport.function.js';
export function loadNewBaseSupport(templater, subject, appElement) {
    const newSupport = getBaseSupport(templater, subject);
    upgradeBaseToSupport(templater, newSupport, newSupport);
    newSupport.appElement = appElement;
    // Initialize older/newer with empty state if first render
    if (!subject.state.oldest) {
        subject.state.oldest = newSupport;
        subject.state.older = subject.state.newer;
    }
    subject.state.newest = newSupport;
    return newSupport;
}
//# sourceMappingURL=loadNewBaseSupport.function.js.map