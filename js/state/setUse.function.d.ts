import { Subject } from '../subject/Subject.class.js';
import { AnySupport } from '../tag/Support.class.js';
import { StateMemory } from './StateMemory.type.js';
export type UseOptions = {
    beforeRender?: (support: AnySupport, ownerTag?: AnySupport) => void;
    beforeRedraw?: (support: AnySupport, tag: AnySupport) => void;
    afterRender?: (support: AnySupport, ownerSupport?: AnySupport) => void;
    beforeDestroy?: (support: AnySupport, tag: AnySupport) => void;
};
export type UseMemory = (Record<string, unknown> & {
    stateConfig: StateMemory;
    tagClosed$: Subject<AnySupport>;
});
