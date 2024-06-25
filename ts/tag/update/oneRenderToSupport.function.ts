import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { TagSubject } from '../../subject.types.js'
import { newSupportByTemplater } from './processTag.function.js'
import { AnySupport } from '../Support.class.js'
import { StringTag } from '../Tag.class.js'
import { Original, TagWrapper } from '../tag.utils.js'
import { ValueTypes } from '../ValueTypes.enum.js'

export function oneRenderToSupport(
  wrapper: Wrapper,
  subject: TagSubject,
  ownerSupport: AnySupport, // owner
) {
  const templater = new TemplaterResult([])
  templater.tagJsType = wrapper.tagJsType as typeof ValueTypes.templater
  const support = newSupportByTemplater(
    templater, ownerSupport, subject
  )

  let tag: StringTag
  const wrap = () => {
    templater.tag = tag || ((wrapper as any)())
    return support
  }

  templater.wrapper = wrap as any as Wrapper
  wrap.parentWrap = wrap as any as TagWrapper<any>
  wrap.tagJsType = wrapper.tagJsType
  wrap.parentWrap.original = wrapper as any as Original

  return support
}
