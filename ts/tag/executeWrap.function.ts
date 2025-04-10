import { TemplaterResult } from './getTemplaterResult.function.js'
import { TagWrapper } from './tag.utils.js'
import { AnySupport } from './getSupport.function.js'
import { StringTag } from './getDomTag.function.js'
import { BasicTypes, ValueTypes } from './ValueTypes.enum.js'
import { setUseMemory } from '../state/setUseMemory.object.js'
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

  const config = setUseMemory.stateConfig
  useSupport.state = config.stateArray
  useSupport.states = config.states
  return useSupport
}
