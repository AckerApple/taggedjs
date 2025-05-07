import { AnySupport } from '../tag/AnySupport.type.js';
import { StateMemory } from './StateMemory.type.js';
import { tagClosed$ } from './tagClosed$.subject.js';
export type UseOptions = {
    beforeRender?: (support: AnySupport, ownerTag?: AnySupport) => void;
    beforeRedraw?: (support: AnySupport, tag: AnySupport) => void;
    afterRender?: (support: AnySupport, ownerSupport?: AnySupport) => void;
    beforeDestroy?: (support: AnySupport, tag: AnySupport) => void;
};
export type UseMemory = (Record<string, unknown> & {
    stateConfig: StateMemory;
    tagClosed$: typeof tagClosed$;
});
