import { BaseTagSupport } from './TagSupport.class.js'
import { TemplaterResult } from './TemplaterResult.class.js'
import { hasPropChanges } from'./hasPropChanges.function.js'

export function hasTagSupportChanged(
  lastSupport: BaseTagSupport,
  newTagSupport: BaseTagSupport,
  newTemplater: TemplaterResult,
): number | false {  
  const latestProps = newTemplater.props // newTagSupport.propsConfig.latest
  const pastCloneProps = lastSupport.propsConfig.latestCloned
  
  const propsChanged = hasPropChanges(latestProps, pastCloneProps)
  // const propsChanged = hasPropChanges(lastSupport.templater.props, newTagSupport.templater.props)
  // const propsChanged = hasPropChanges(lastSupport.propsConfig.latestCloned, newTagSupport.propsConfig.latestCloned)

  // if no changes detected, no need to continue to rendering further tags
  if(propsChanged) {
    return propsChanged
  }

  const propsChanged2 = hasPropChanges(lastSupport.propsConfig.latestCloned, newTagSupport.propsConfig.latestCloned)
  if(propsChanged2) {
    return propsChanged2
  }

  const kidsChanged = hasKidsChanged(lastSupport, newTagSupport)
  // we already know props didn't change and if kids didn't either, than don't render
  return kidsChanged
}

export function hasKidsChanged(
  oldTagSupport: BaseTagSupport,
  newTagSupport: BaseTagSupport,
): number | false {
  const oldCloneKidValues = oldTagSupport.propsConfig.lastClonedKidValues
  const newClonedKidValues = newTagSupport.propsConfig.lastClonedKidValues

  const everySame = oldCloneKidValues.every((set, index) => {
    const x = newClonedKidValues[index]
    return set.every((item, index) => item === x[index])
  })

  return everySame ? false : 9
}
