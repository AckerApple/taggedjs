import { renderWithSupport } from'./renderWithSupport.function.js'
import { TagSubject } from '../../subject.types.js'
import { BaseTagSupport, TagSupport } from '../TagSupport.class.js'

export function renderSubjectComponent(
  subject: TagSubject,
  reSupport: TagSupport | BaseTagSupport,
  ownerSupport: TagSupport,
): TagSupport {
  const preClones = ownerSupport.clones.map(clone => clone)
  
  reSupport = renderWithSupport(
    reSupport,
    subject.tagSupport, // existing tag
    subject,
    ownerSupport,
  )

  reSupport.global.newest = reSupport

  if(ownerSupport.clones.length > preClones.length) {
    const myClones = ownerSupport.clones.filter(fClone => !preClones.find(clone => clone === fClone))
    reSupport.clones.push(...myClones)
  }

  ownerSupport.childTags.push(reSupport as TagSupport)

  return reSupport as TagSupport
}