import { Props } from './Props'
import { Tag } from './Tag.class'
import { TagSupport } from './TagSupport.class'
import { TemplaterResult } from './TemplaterResult.class'
import { isTagInstance } from './isInstance'
import { renderExistingTag } from './renderExistingTag.function'
import { getStateValue } from './set.function'

/* Used to rewrite props that are functions. When they are called it should cause parent rendering */
export function alterProps(
  props: Props,
  templater: TemplaterResult,
  ownerSupport: TagSupport,
) {
  function callback(toCall: any, callWith: any) {
    const renderCount = templater.global.renderCount
    const callbackResult = toCall(...callWith)

    const tag = templater.global.newest
    
    if(templater.global.renderCount > renderCount) {
      throw new Error('already rendered')
    }

    const ownerTag = tag?.ownerTag as Tag
    const ownerTagSupport = ownerTag.tagSupport
    const ownerGlobal = ownerTagSupport.templater.global
    const newestOwner = ownerGlobal.newest as Tag
    const oldestGlobal = newestOwner.tagSupport.templater.global

    console.log('--- render parent that passed props ---', {
      original: newestOwner.tagSupport.templater.wrapper?.original,
      state: newestOwner.tagSupport.memory.state.newest,
      subject: newestOwner.tagSupport.subject.tag,
      equal: newestOwner === newestOwner.tagSupport.subject.tag,
      // lastTagOwner2: lastTag?.ownerTag?.tagSupport.memory.state.newest[2]?.get(),
      // equalLast: lastTag === newestOwner.tagSupport.subject.tag
      state2: newestOwner.tagSupport.memory.state.newest[2]?.get(),
      //xx: ownerSupport.memory.state.newest[2].get()
      equalOwnerWrap: ownerTagSupport.templater.wrapper?.original === newestOwner.tagSupport.templater.wrapper?.original,
      
      ownerOriginal: ownerTagSupport.templater.wrapper?.original,
      
      ownerGlobal: ownerGlobal.oldest?.hasLiveElements,
      oldestGlobal: oldestGlobal.oldest?.hasLiveElements,
      
      equalGlobal: ownerGlobal == oldestGlobal,
      argOwner: ownerSupport.templater.global.oldest?.hasLiveElements,
    })

    // ??? - new
    // newestOwner.tagSupport.render(
    ownerSupport.render(
      true,
      // newestOwner.tagSupport, newestOwner.tagSupport.subject
    )
    return callbackResult
  }
  
  const isPropTag = isTagInstance(props)
  const watchProps = isPropTag ? 0 : props
  const newProps = resetFunctionProps(watchProps, callback)

  return newProps
}

function resetFunctionProps(
  props: any,
  callback: (toCall: any, callWith: any) => unknown,
) {
  if(typeof(props)!=='object') {
    return props
  }

  const newProps = props
  // BELOW: Do not clone because if first argument is object, the memory ref back is lost
  // const newProps = {...props} 

  Object.entries(newProps).forEach(([name, value]) => {
    if(value instanceof Function) {
      const original = newProps[name].original
      
      if(original) {
        return // already previously converted
      }

      newProps[name] = (...args: any[]) => {
        return callback(value, args)
      }

      newProps[name].original = value

      return
    }
  })

  return newProps
}
