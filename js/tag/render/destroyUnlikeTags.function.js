import { softDestroySupport } from './softDestroySupport.function.js';
import { moveProviders } from '../update/updateExistingTagComponent.function.js';
export function destroyUnlikeTags(lastSupport, // old
reSupport) {
    // when a tag is destroyed, disconnect the globals
    const global = reSupport.subject.global; // = {...oldGlobal} // break memory references
    moveProviders(lastSupport, reSupport);
    softDestroySupport(lastSupport);
    delete global.deleted;
    global.oldest = reSupport;
    global.newest = reSupport;
}
//# sourceMappingURL=destroyUnlikeTags.function.js.map