import { TagGlobal } from '../TemplaterResult.class.js'
import { BaseSupport, Support } from '../Support.class.js'
import { Subject } from '../../subject/Subject.class.js'  

export function getNewGlobal(): TagGlobal {
  return {
    isAttr: false,
    destroy$: new Subject<BaseSupport | Support>(),
    context: [], // populated after reading interpolated.values array converted to an object {variable0, variable:1}
    providers: [],
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: 0,
    subscriptions: [],
    oldest: undefined as any, // TODO: This needs to addressed
    
    blocked: [], // renders that did not occur because an event was processing
    childTags: [], // tags on me
    // htmlDomMeta: [],
  }
}
