import { TagGlobal } from '../TemplaterResult.class.js'
import { BaseSupport, Support } from '../Support.class.js'
import { Subject } from '../../subject/Subject.class.js'  

export function getNewGlobal(): TagGlobal {
  return {
    destroy$: new Subject<BaseSupport | Support>(),
    
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: 0,
    oldest: undefined as any, // TODO: This needs to addressed

    // TODO: Not every context is using this except only tags
    blocked: [], // renders that did not occur because an event was processing
    // childTags: [], // tags on me
  }
}
