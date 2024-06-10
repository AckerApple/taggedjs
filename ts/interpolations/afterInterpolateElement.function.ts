import { buildClones } from '../buildClones.function.js'
import { Template, afterElmBuild } from './interpolateTemplate.js'
import { Context, ElementBuildOptions } from '../tag/Tag.class.js'
import { Support } from '../tag/Support.class.js'

export function afterInterpolateElement(
  container: DocumentFragment,
  template: Template,
  support: Support,
  context: Context,
  options: ElementBuildOptions,
) {
  const clones = buildClones(container, template)
  if(!clones.length) {
    return clones
  }

  const global = support.subject.global
  for (let index = clones.length - 1; index >= 0; --index) {
    const clone = clones[index]
    afterElmBuild(clone, options, context, support)
  }
  global.clones.push( ...clones )

  return clones
}
