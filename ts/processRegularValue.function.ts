import { Clones } from "./Clones.type"
import { Tag } from "./Tag.class"
import { Template, updateBetweenTemplates } from "./interpolateTemplate.js"

export function processRegularValue(
  value: any,
  result: any, // could be tag via result.tag
  template: Template, // <template end interpolate /> (will be removed)
  tag: Tag, // owner
) {
  const before = result.clone || template // Either the template is on the doc OR its the first element we last put on doc
  
  // Processing of regular values
  const clone = updateBetweenTemplates(
    value,
    before, // this will be removed
  )

  result.clone = clone // remember single element put down, for future updates

  const clones: Clones = []
  const oldPos = tag.clones.indexOf(before) // is the insertBefore guide being considered one of the tags clones?
  const isOnlyGuideInClones = oldPos>=0 && !tag.clones.includes(clone)
  const exchangeGuideForClone = isOnlyGuideInClones && !before.parentNode // guide is in clones AND guide is not on the document

  if( exchangeGuideForClone ) {
    tag.clones.splice(oldPos, 1) // remove insertBefore guide from tag
    tag.clones.push(clone) // exchange guide for element actually on document
    clones.push(clone) // record the one element that in the end is on the document
  }

  return clones
}
