import { TemplaterResult } from './TemplaterResult.class.js'
import { TagWrapper } from './tag.utils.js'
import { AnySupport } from './Support.class.js'
import { StringTag } from './Tag.class.js'
import { ValueTypes } from './ValueTypes.enum.js'
import { getCastedProps } from './getTagWrap.function.js'
import { setUseMemory } from '../state/setUse.function.js'

export function executeWrap(
  templater: TemplaterResult,
  result: TagWrapper<any>,
  newSupport: AnySupport,
  useSupport: AnySupport,
  lastSupport?: AnySupport | undefined,
): AnySupport {
  const originalFunction = result.original // (innerTagWrap as any).original as unknown as TagComponent
  const stateless = templater.tagJsType === ValueTypes.stateRender
  const castedProps = stateless ? undefined : getCastedProps(
    templater,
    newSupport,
    lastSupport,
  )

  let tag: StringTag;
  if(stateless) {
    tag = templater as any as StringTag

    tag = (templater as any)()
  } else {
    tag = originalFunction(...castedProps as unknown[])

    // CALL ORIGINAL COMPONENT FUNCTION
    if(tag instanceof Function) {
      tag = tag()
    }
  }

  
  /* ??? - newly removed. Intended to convert tag component returns into always tags
  const unknown = !tag || !tag.tagJsType // (tag.tagJsType && ![ValueTypes.tag,ValueTypes.dom].includes(tag.tagJsType))
  if(unknown) {
    tag = html`${tag}` // component returned a non-component value
  }
  */

  tag.templater = templater
  templater.tag = tag

  const nowState = setUseMemory.stateConfig.array
  useSupport.state.push(...nowState)

  return useSupport
}
