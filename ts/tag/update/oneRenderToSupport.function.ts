import { getTemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { newSupportByTemplater } from './processTag.function.js'
import { AnySupport } from '../Support.class.js'
import { StringTag } from '../Tag.class.js'
import { ContextItem } from '../Context.types.js'
import { Original, TagWrapper } from '../tag.utils.js'
import { ValueTypes } from '../ValueTypes.enum.js'

export function oneRenderToSupport(
  wrapper: Wrapper,
  subject: ContextItem,
  ownerSupport: AnySupport, // owner
) {
  const templater = getTemplaterResult([])
  templater.tagJsType = wrapper.tagJsType as typeof ValueTypes.templater
  const support = newSupportByTemplater(
    templater, ownerSupport, subject
  )

  let tag: StringTag
  function wrap() {
    templater.tag = tag || ((wrapper as any)())
    return support
  }

  templater.wrapper = wrap as any as Wrapper
  wrap.parentWrap = wrap as any as TagWrapper<any>
  wrap.tagJsType = wrapper.tagJsType
  wrap.parentWrap.original = wrapper as any as Original

  return support
}
