import { hasPropChanges } from './hasPropChanges.function.js';
export function hasSupportChanged(lastSupport, newSupport, newTemplater) {
    const latestProps = newTemplater.props; // newSupport.propsConfig.latest
    const pastCloneProps = lastSupport.propsConfig.latestCloned;
    const propsChanged = hasPropChanges(latestProps, pastCloneProps);
    // if no changes detected, no need to continue to rendering further tags
    if (propsChanged) {
        return propsChanged;
    }
    const propsChanged2 = hasPropChanges(lastSupport.propsConfig.latestCloned, newSupport.propsConfig.latestCloned);
    if (propsChanged2) {
        return propsChanged2;
    }
    const kidsChanged = hasKidsChanged(lastSupport, newSupport);
    // we already know props didn't change and if kids didn't either, than don't render
    return kidsChanged;
}
export function hasKidsChanged(oldSupport, newSupport) {
    const oldCloneKidValues = oldSupport.propsConfig.lastClonedKidValues;
    const newClonedKidValues = newSupport.propsConfig.lastClonedKidValues;
    const everySame = oldCloneKidValues.every((set, index) => {
        const x = newClonedKidValues[index];
        return set.every((item, index) => item === x[index]);
    });
    return everySame ? false : 9;
}
//# sourceMappingURL=hasSupportChanged.function.js.map