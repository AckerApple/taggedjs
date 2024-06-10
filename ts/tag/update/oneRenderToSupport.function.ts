import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { TagSubject } from '../../subject.types.js'
import { newSupportByTemplater } from './processTag.function.js'
import { Support } from '../Support.class.js'
import { Tag } from '../Tag.class.js'
import { ValueTypes } from '../ValueTypes.enum.js'

export function oneRenderToSupport(
  wrapper: Wrapper,
  subject: TagSubject,
  ownerSupport: Support, // owner
) {
  const templater = new TemplaterResult([])
  templater.tagJsType = ValueTypes.oneRender
  const support = newSupportByTemplater(
    templater, ownerSupport, subject
  )

  let tag: Tag
  const wrap = () => {
    templater.tag = tag || ((wrapper as any)())
    return support
  }

  templater.wrapper = wrap as any
  wrap.parentWrap = wrap
  wrap.oneRender = true
  ;(wrap.parentWrap as any).original = wrapper

  return support
}
