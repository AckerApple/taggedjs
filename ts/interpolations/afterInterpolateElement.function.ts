import { buildClones } from '../render'
import { afterElmBuild } from './interpolateTemplate'
import { InsertBefore } from './Clones.type'
import { Context, ElementBuildOptions } from '../tag/Tag.class'
import { TagSupport } from '../tag/TagSupport.class'

export function afterInterpolateElement(
  container: DocumentFragment,
  insertBefore: InsertBefore,
  tagSupport: TagSupport,
  context: Context,
  options: ElementBuildOptions,
) {
  const clones = buildClones(container, insertBefore)
  if(!clones.length) {
    return clones
  }

  for (let index = clones.length - 1; index >= 0; --index) {
    const clone = clones[index]
    afterElmBuild(clone, options, context, tagSupport)
    tagSupport.clones.push( clone )
  }

  return clones
}
