import { buildClones } from '../render'
import { afterElmBuild } from './interpolateTemplate'
import { InsertBefore } from './Clones.type'
import { Context, ElementBuildOptions } from '../tag/Tag.class'
import { TagSupport } from '../tag/TagSupport.class'

export function afterInterpolateElement(
  container: Element,
  insertBefore: InsertBefore,
  tagSupport: TagSupport,
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
