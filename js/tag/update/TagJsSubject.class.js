import { Subject } from '../../subject/Subject.class.js';
import { ValueSubject } from '../../subject/ValueSubject.js';
import { ValueTypes } from '../ValueTypes.enum.js';
export class TagJsSubject extends ValueSubject {
    tagJsType = ValueTypes.tagJsSubject;
    // travels with all rerenderings
    global = getNewGlobal();
    lastRun;
}
export function getNewGlobal() {
    return {
        destroy$: new Subject(),
        context: {}, // populated after reading interpolated.values array converted to an object {variable0, variable:1}
        providers: [],
        /** Indicator of re-rending. Saves from double rending something already rendered */
        renderCount: 0,
        subscriptions: [],
        oldest: undefined, // TODO: This needs to addressed
        blocked: [], // renders that did not occur because an event was processing
        childTags: [], // tags on me
        clones: [], // elements on document. Needed at destroy process to know what to destroy
    };
}
//# sourceMappingURL=TagJsSubject.class.js.map