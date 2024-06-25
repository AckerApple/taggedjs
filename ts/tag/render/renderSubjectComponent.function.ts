import { renderWithSupport } from'./renderWithSupport.function.js'
import { TagSubject } from '../../subject.types.js'
import { BaseSupport, Support } from '../Support.class.js'

export function renderSubjectComponent(
  subject: TagSubject,
  reSupport: Support | BaseSupport,
  ownerSupport: BaseSupport | Support,
): Support {
  const ownGlobal = ownerSupport.subject.global
  const preClones = ownGlobal.htmlDomMeta.map(clone => clone)

  reSupport = renderWithSupport(
    reSupport,
    subject.support, // existing tag
    subject,
    ownerSupport,
  )

  const reGlobal = reSupport.subject.global
  if(ownGlobal.htmlDomMeta.length > preClones.length) {
    const myClones = ownGlobal.htmlDomMeta.filter(fClone => !preClones.find(clone => clone === fClone))
    reGlobal.htmlDomMeta.push(...myClones)
  }

  return reSupport as Support
}
