import { buildClones } from './render'
import { afterElmBuild } from './interpolations/interpolateTemplate'
import { InsertBefore } from './Clones.type'
import { Context, ElementBuildOptions } from './Tag.class'
import { TagSupport } from './TagSupport.class'

export function afterInterpolateElement(
  container: Element,
  insertBefore: InsertBefore,
  tagSupport: TagSupport,
  // preClones: Clones,
  context: Context,
  options: ElementBuildOptions,
) {
  const clones = buildClones(container, insertBefore)
  if(!clones.length) {
    return clones
  }

  clones.forEach(clone => afterElmBuild(clone, options, context, tagSupport))
  tagSupport.clones.push( ...clones )

  return clones
}
