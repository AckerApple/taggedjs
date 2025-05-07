import { getSupportInCycle } from '../tag/getSupportInCycle.function.js'
import { Subject } from '../subject/Subject.class.js'
import { AnySupport } from '../tag/AnySupport.type.js'

  /** Emits event at the end of a tag being rendered. Use tagClosed$.toPromise() to render a tag after a current tag is done rendering  */
export const tagClosed$ = new Subject<AnySupport>(undefined, function tagCloser(subscription) {
    if( !getSupportInCycle() ) {
      subscription.next() // we are not currently processing so process now
    }
  })
