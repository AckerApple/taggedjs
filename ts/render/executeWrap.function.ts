import { TemplaterResult } from '../tag/getTemplaterResult.function.js'
import { TagWrapper } from '../tag/tag.utils.js'
import { AnySupport } from '../tag/index.js'
import { StringTag } from '../tag/StringTag.type.js'
import { BasicTypes, ValueTypes } from '../tag/ValueTypes.enum.js'
import { setUseMemory } from '../state/setUseMemory.object.js'
import { Props } from '../Props.js'
import { setSupportInCycle } from '../tag/cycles/getSupportInCycle.function.js'

type ReturnStringTag = (...n: unknown[]) => StringTag

export function executeWrap(
  templater: TemplaterResult,
  result: TagWrapper<unknown>,
  useSupport: AnySupport,
  castedProps?: Props
): AnySupport {
  const originalFunction = result.original // (innerTagWrap as any).original as unknown as TagComponent
  const stateless = templater.tagJsType === ValueTypes.stateRender
  const config = setUseMemory.stateConfig

  setSupportInCycle(useSupport)

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

  useSupport.context.state.newer = { ...config }

  return useSupport
}
