import { isSubjectInstance, isTagComponent } from '../../isInstance.js'
import { TemplateValue } from './processFirstSubject.utils.js'
import { TagSubject } from '../../subject.types.js'
import { Context } from '../Tag.class.js'
import { TagSupport } from '../TagSupport.class.js'
import { TemplaterResult, Wrapper } from '../TemplaterResult.class.js'

export function updateContextItem(
  context: Context,
  variableName: string,
  value: TemplateValue
) {
  const subject = context[variableName]
  const tagSubject = subject as TagSubject
  const tagSupport = tagSubject.tagSupport as TagSupport

  if(tagSupport) {
    if(value) {
      if( isTagComponent(value) ) {
        const templater = value as TemplaterResult        
        let newSupport = new TagSupport(
          templater,
          tagSupport.ownerTagSupport,
          subject as TagSubject,
        )
        
        // TODO: Need to review if this is used
        if(isTagComponent(tagSupport)) {
          console.warn('👉 deprecated code is being used #shareTemplaterGlobal 👈')
          shareTemplaterGlobal(tagSupport, newSupport)
        }
      }
    }
  }

  if(isSubjectInstance(value)) {
    return // emits on its own
  }

  // listeners will evaluate updated values to possibly update display(s)
  subject.next(value)
  
  return
}

function shareTemplaterGlobal(
  oldTagSupport: TagSupport,
  tagSupport: TagSupport,
) {
  const oldTemp = oldTagSupport.templater
  const oldWrap = oldTemp.wrapper as Wrapper // tag versus component
  const oldValueFn = oldWrap.parentWrap.original
  
  const templater = tagSupport.templater
  const newWrapper = templater.wrapper
  const newValueFn = newWrapper?.parentWrap.original
  const fnMatched = oldValueFn === newValueFn

  if(fnMatched) {
    tagSupport.global = oldTagSupport.global
    const newest = oldTagSupport.global.newest as TagSupport
    if(newest) {
      const prevState = newest.memory.state
      tagSupport.memory.state.length = 0
      tagSupport.memory.state.push(...prevState)
    }
  }
}
