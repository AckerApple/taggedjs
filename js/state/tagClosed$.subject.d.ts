import { Subject } from '../subject/Subject.class.js';
import { AnySupport } from '../tag/AnySupport.type.js';
/** Emits event at the end of a tag being rendered. Use tagClosed$.toPromise() to render a tag after a current tag is done rendering  */
export declare const tagClosed$: Subject<AnySupport>;
