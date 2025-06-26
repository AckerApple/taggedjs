import { updateSupportBy } from '../../render/update/updateSupportBy.function.js';
import { createSupport } from '../createSupport.function.js';
export function handleStillTag(oldSupport, subject, value, ownerSupport) {
    // Value is result of either tag(() => html``) or () => html``
    let templater = value.templater || value;
    const oldTtag = oldSupport.templater.tag;
    if (oldTtag) {
        const innerHTML = oldTtag._innerHTML;
        if (innerHTML) {
            // Value has innerHTML that is either tag() or html``
            templater = value.outerHTML || value._innerHTML.outerHTML;
        }
    }
    const valueSupport = createSupport(templater, ownerSupport, ownerSupport.appSupport, subject);
    const lastSubject = oldSupport.context;
    const newGlobal = lastSubject.global;
    const oldest = newGlobal.oldest;
    updateSupportBy(oldest, valueSupport);
}
//# sourceMappingURL=handleStillTag.function.js.map