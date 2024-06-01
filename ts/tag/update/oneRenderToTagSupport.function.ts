import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'
import { TagSubject } from '../../subject.types.js'
import { newTagSupportByTemplater } from './processTag.function.js'
import { TagSupport } from '../TagSupport.class.js'
import { Tag } from '../Tag.class.js'

export function oneRenderToTagSupport(
  wrapper: Wrapper,
  subject: TagSubject,
  ownerSupport: TagSupport, // owner
) {
  const templater = new TemplaterResult([])
  templater.tagJsType = 'oneRender'
  const tagSupport = newTagSupportByTemplater(
    templater, ownerSupport, subject
  )

  let tag: Tag
  const wrap = () => {
    templater.tag = tag || ((wrapper as any)())
    return tagSupport
  }

  templater.wrapper = wrap as any
  wrap.parentWrap = wrap
  wrap.oneRender = true
  ;(wrap.parentWrap as any).original = wrapper

  return tagSupport
}
