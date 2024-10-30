import { TemplaterResult } from './TemplaterResult.class.js'
import { TagWrapper } from './tag.utils.js'
import { AnySupport } from './Support.class.js'
import { StringTag } from './Tag.class.js'
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js'
import { setUseMemory } from '../state/setUse.function.js'
import { Props } from '../Props.js'

type ReturnStringTag = (...n: unknown[]) => StringTag

export function executeWrap(
  templater: TemplaterResult,
  result: TagWrapper<unknown>,
  useSupport: AnySupport,
  castedProps?: Props
): AnySupport {
  const originalFunction = result.original // (innerTagWrap as any).original as unknown as TagComponent
  const stateless = templater.tagJsType === ValueTypes.stateRender

  let tag: StringTag;
  if(stateless) {
    tag = (templater as unknown as ReturnStringTag)()
  } else {
    tag = originalFunction(...castedProps as unknown[]) as StringTag

    // CALL ORIGINAL COMPONENT FUNCTION
    if(typeof(tag) === BasicTypes.function) {
      tag = (tag as unknown as ReturnStringTag)()
    }
  }

  tag.templater = templater
  templater.tag = tag

  const nowState = setUseMemory.stateConfig.stateArray
  useSupport.state = nowState

  return useSupport
}
