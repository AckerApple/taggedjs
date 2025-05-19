import { paint, painting } from '../paint.function.js';
import { processUpdateContext } from '../../tag/processUpdateContext.function.js';
export function updateSupportBy(olderSupport, newerSupport) {
    const global = olderSupport.subject.global;
    const context = global.context;
    updateSupportValuesBy(olderSupport, newerSupport);
    ++painting.locks;
    processUpdateContext(olderSupport, context);
    --painting.locks;
    paint();
}
export function updateSupportValuesBy(olderSupport, newerSupport) {
    const newTemplate = newerSupport.templater;
    const tempTag = newerSupport.templater.tag;
    const values = newTemplate.values || tempTag.values;
    const tag = olderSupport.templater.tag;
    tag.values = values;
}
//# sourceMappingURL=updateSupportBy.function.js.map