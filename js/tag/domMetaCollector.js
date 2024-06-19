import { htmlInterpolationToDomMeta } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js';
import { getStringsId } from './getStringsId.function.js';
import { isLastRunMatched } from './isLastRunMatched.function.js';
const lastRuns = {};
/** Converts strings & values into dom meta */
export function getDomMeta(strings, values) {
    const stringId = getStringsId(strings, values);
    const lastRun = lastRuns[stringId];
    const matches = lastRun && isLastRunMatched(strings, values, lastRun);
    let domMeta;
    if (matches) {
        domMeta = lastRun.domMeta;
        return domMeta;
    }
    domMeta = htmlInterpolationToDomMeta(strings, values);
    const template = {
        interpolation: undefined,
        string: undefined,
        strings,
        values,
        domMeta,
    };
    lastRuns[stringId] = template;
    return domMeta;
}
//# sourceMappingURL=domMetaCollector.js.map