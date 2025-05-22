import { paintAppend, paintAppends } from '../render/paint.function.js';
import { empty } from './ValueTypes.enum.js';
export function gaurenteeInsertBefore(appendTo, insertBefore) {
    let appendMarker;
    // do we need to append now but process subscription later?
    if (appendTo) {
        appendMarker = insertBefore = document.createTextNode(empty);
        paintAppends.push({
            processor: paintAppend,
            args: [appendTo, insertBefore]
        });
    }
    return {
        appendMarker,
        insertBefore: insertBefore,
    };
}
//# sourceMappingURL=gaurenteeInserBefore.function.js.map