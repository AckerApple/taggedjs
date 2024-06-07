import { buildClones } from '../render.js'
import { afterElmBuild } from './interpolateTemplate.js'
import { InsertBefore } from './InsertBefore.type.js'
import { Context, ElementBuildOptions } from '../tag/Tag.class.js'
import { TagSupport } from '../tag/TagSupport.class.js'

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
    tagSupport.global.clones.push( clone )
  }

  return clones
}
