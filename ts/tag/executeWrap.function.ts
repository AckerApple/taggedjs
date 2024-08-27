import { TemplaterResult } from './TemplaterResult.class.js'
import { TagWrapper } from './tag.utils.js'
import { AnySupport } from './Support.class.js'
import { StringTag } from './Tag.class.js'
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js'
import { setUseMemory } from '../state/setUse.function.js'
import { Props } from '../Props.js'

export function executeWrap(
  templater: TemplaterResult,
  result: TagWrapper<any>,
  useSupport: AnySupport,
  castedProps?: Props
): AnySupport {
  const originalFunction = result.original // (innerTagWrap as any).original as unknown as TagComponent
  const stateless = templater.tagJsType === ValueTypes.stateRender

  let tag: StringTag;
  if(stateless) {
    tag = templater as any as StringTag

    tag = (templater as any)()
  } else {
    tag = originalFunction(...castedProps as unknown[])

    // CALL ORIGINAL COMPONENT FUNCTION
    if(typeof(tag) === BasicTypes.function) {
      tag = (tag as any)()
    }
  }

  tag.templater = templater
  templater.tag = tag

  const nowState = setUseMemory.stateConfig.array
  useSupport.state = nowState

  return useSupport
}
