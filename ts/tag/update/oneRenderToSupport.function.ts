import { getTemplaterResult, Wrapper } from '../getTemplaterResult.function.js'
import { newSupportByTemplater } from './processTag.function.js'
import { AnySupport } from '../AnySupport.type.js'
import { StringTag } from '../StringTag.type.js'
import { ContextItem } from '../Context.types.js'
import { Original } from '../tag.utils.js'
import { ValueTypes } from '../ValueTypes.enum.js'
import { PropWatches } from '../tag.function.js'

export function oneRenderToSupport(
  wrapper: Wrapper,
  subject: ContextItem,
  ownerSupport: AnySupport, // owner
) {
  const templater = getTemplaterResult(PropWatches.DEEP)
  templater.tagJsType = wrapper.tagJsType as typeof ValueTypes.templater
  const support = newSupportByTemplater(
    templater, ownerSupport, subject
  )

  let tag: StringTag | undefined
  function wrap() {
    templater.tag = (tag as StringTag) || wrapper()
    return support
  }

  templater.wrapper = wrap as unknown as Wrapper
  wrap.tagJsType = wrapper.tagJsType
  wrap.original = wrapper.original || wrapper as unknown as Original

  return support
}

export type UnknownFunction = (...n:unknown[]) => unknown
