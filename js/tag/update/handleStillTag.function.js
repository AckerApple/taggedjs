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
            templater = value._innerHTML;
        }
    }
    const valueSupport = createSupport(templater, subject, ownerSupport, ownerSupport.appSupport);
    const lastSubject = oldSupport.context;
    const oldest = lastSubject.state.oldest;
    updateSupportBy(oldest, valueSupport);
}
//# sourceMappingURL=handleStillTag.function.js.map