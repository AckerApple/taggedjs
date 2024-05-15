import { isSubjectInstance, isTagComponent } from '../../isInstance'
import { TemplateValue } from './processSubjectValue.function'
import { TagSubject } from '../../subject.types'
import { Context, Tag } from '../Tag.class'
import { TagSupport } from '../TagSupport.class'
import { TemplaterResult, Wrapper } from '../../TemplaterResult.class'

export function updateContextItem(
  context: Context,
  variableName: string,
  value: TemplateValue
) {
  const subject = context[variableName]
  const tagSubject = subject as TagSubject
  const tagSupport = tagSubject.tagSupport

  if(tagSupport) {
    if(value) {
      if( isTagComponent(value) ) {
        const templater = value as TemplaterResult        
        let newSupport = new TagSupport(
          templater,
          tagSupport.ownerTagSupport,
          subject as TagSubject,
        )
        
        if(isTagComponent(tagSupport)) {
          shareTemplaterGlobal(tagSupport, newSupport)
        }
      }
    }
  }

  if(isSubjectInstance(value)) {
    return // emits on its own
  }

  // listeners will evaluate updated values to possibly update display(s)
  subject.set(value)
  
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
      tagSupport.memory.state = [...prevState]
    }
  }
}
