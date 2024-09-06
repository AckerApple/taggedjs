import { renderWithSupport } from './renderWithSupport.function.js';
export function renderSubjectComponent(subject, reSupport, ownerSupport) {
    const ownGlobal = ownerSupport.subject.global;
    reSupport = renderWithSupport(reSupport, subject.support, // existing tag
    subject, ownerSupport);
    /*
    const htmlDomMeta = ownGlobal.htmlDomMeta as DomObjectChildren
    if(!htmlDomMeta) {
      console.log('xxxxx', ownGlobal)
    }
    if(htmlDomMeta) {
      const reGlobal = reSupport.subject.global
      const preClones = htmlDomMeta.map(clone => clone)
      if(htmlDomMeta.length > preClones.length) {
        const myClones = htmlDomMeta.filter(fClone => !preClones.find(clone => clone === fClone))
        const reHtmlDomMeta = reGlobal.htmlDomMeta as DomObjectChildren
        reHtmlDomMeta.push(...myClones)
      }
    }
    */
    return reSupport;
}
//# sourceMappingURL=renderSubjectComponent.function.js.map