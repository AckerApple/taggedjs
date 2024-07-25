import { TemplaterResult, Wrapper } from './TemplaterResult.class.js'
import { TagWrapper } from './tag.utils.js'
import { AnySupport } from './Support.class.js'
import { setUse } from '../state/setUse.function.js'
import { ContextItem, StringTag } from './Tag.class.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { html } from './html.js'
import { getCastedProps } from './getTagWrap.function.js'

export function executeWrap(
  templater: TemplaterResult,
  result: TagWrapper<any>,
  newSupport: AnySupport,
  subject: ContextItem,
  useSupport: AnySupport,
  lastSupport?: AnySupport | undefined,
): AnySupport {
  const originalFunction = result.original // (innerTagWrap as any).original as unknown as TagComponent
  const stateless = templater.tagJsType === ValueTypes.stateRender
  const castedProps = stateless ? [] : getCastedProps(
    templater,
    newSupport,
    lastSupport,
  )

  let tag: StringTag;
  if(stateless) {
    tag = templater as any as StringTag
  } else {
    tag = originalFunction(...castedProps)
  }

  // CALL ORIGINAL COMPONENT FUNCTION
  if(tag instanceof Function) {
    tag = tag()
  }
  
  const unknown = !tag || (tag.tagJsType && ![ValueTypes.tag,ValueTypes.dom].includes(tag.tagJsType))
  if(unknown) {
    tag = html`${tag}` // component returned a non-component value
  }

  tag.templater = templater
  templater.tag = tag

  const nowState = setUse.memory.stateConfig.array
  useSupport.state.push(...nowState)

  return useSupport
}
