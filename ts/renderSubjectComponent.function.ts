import { renderWithSupport } from './renderWithSupport.function'
import { TagSubject } from './subject.types'
import { TagSupport } from './TagSupport.class'

export function renderSubjectComponent(
  subject: TagSubject,
  reSupport: TagSupport,
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

  ownerSupport.childTags.push(reSupport)

  return reSupport
}