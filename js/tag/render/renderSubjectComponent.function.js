import { renderWithSupport } from './renderWithSupport.function.js';
export function renderSubjectComponent(subject, reSupport, ownerSupport) {
    const ownGlobal = ownerSupport.subject.global;
    const preClones = ownGlobal.clones.map(clone => clone);
    reSupport = renderWithSupport(reSupport, subject.support, // existing tag
    subject, ownerSupport);
    const reGlobal = reSupport.subject.global;
    if (ownGlobal.clones.length > preClones.length) {
        const myClones = ownGlobal.clones.filter(fClone => !preClones.find(clone => clone === fClone));
        reGlobal.clones.push(...myClones);
    }
    return reSupport;
}
//# sourceMappingURL=renderSubjectComponent.function.js.map