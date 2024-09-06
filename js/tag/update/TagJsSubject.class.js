import { Subject } from '../../subject/Subject.class.js';
export function getNewGlobal() {
    return {
        destroy$: new Subject(),
        context: [], // populated after reading interpolated.values array converted to an object {variable0, variable:1}
        providers: [],
        /** Indicator of re-rending. Saves from double rending something already rendered */
        renderCount: 0,
        subscriptions: [],
        oldest: undefined, // TODO: This needs to addressed
        blocked: [], // renders that did not occur because an event was processing
        childTags: [], // tags on me
        // htmlDomMeta: [],
    };
}
//# sourceMappingURL=TagJsSubject.class.js.map