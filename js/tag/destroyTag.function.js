import { destroySupport } from './destroySupport.function.js';
export function destroyTagMemory(oldSupport) {
    const subject = oldSupport.subject;
    const global = subject.global;
    const oldest = global.oldest;
    destroySupport(oldest);
}
//# sourceMappingURL=destroyTag.function.js.map