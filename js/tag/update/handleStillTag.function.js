import { updateSupportBy } from '../../render/update/updateSupportBy.function.js';
import { createSupport } from '../createSupport.function.js';
export function handleStillTag(lastSupport, subject, value, ownerSupport) {
    const templater = value.templater || value;
    const valueSupport = createSupport(templater, ownerSupport, ownerSupport.appSupport, subject);
    const lastSubject = lastSupport.subject;
    const newGlobal = lastSubject.global;
    const oldest = newGlobal.oldest;
    updateSupportBy(oldest, valueSupport);
}
//# sourceMappingURL=handleStillTag.function.js.map