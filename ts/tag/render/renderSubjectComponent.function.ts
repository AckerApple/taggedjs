import { renderWithSupport } from'./renderWithSupport.function.js'
import { TagSubject } from '../../subject.types.js'
import { BaseTagSupport, TagSupport } from '../TagSupport.class.js'

export function renderSubjectComponent(
  subject: TagSubject,
  reSupport: TagSupport | BaseTagSupport,
  ownerSupport: TagSupport,
): TagSupport {
  const preClones = ownerSupport.global.clones.map(clone => clone)
  
  reSupport = renderWithSupport(
    reSupport,
    subject.tagSupport, // existing tag
    subject,
    ownerSupport,
  )

  if(ownerSupport.global.clones.length > preClones.length) {
    const myClones = ownerSupport.global.clones.filter(fClone => !preClones.find(clone => clone === fClone))
    reSupport.global.clones.push(...myClones)
  }

  return reSupport as TagSupport
}