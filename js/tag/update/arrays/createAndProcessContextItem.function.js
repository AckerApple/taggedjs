// taggedjs-no-compile
import { paintAppends, paintCommands } from '../../../render/paint.function.js';
import { domProcessContextItem } from '../../../interpolations/optimizers/domProcessContextItem.function.js';
import { empty } from '../../ValueTypes.enum.js';
import { getNewContext } from '../../../render/addOneContext.function.js';
/** Used by arrays and subcontext creators like subscribe. Must provide insertBefore OR appendTo */
export function createAndProcessContextItem(value, ownerSupport, contexts, insertBefore, // used during updates
appendTo) {
    const startMarker = document.createTextNode(empty);
    const endMarker = document.createTextNode(empty);
    const contextItem = getNewContext(value, contexts, true, ownerSupport.context);
    contextItem.withinOwnerElement = false;
    contextItem.arrayStartMarker = startMarker;
    contextItem.placeholder = endMarker;
    if (appendTo) {
        paintAppends.push([
            paintArrayMarkerAppend,
            [appendTo, startMarker, contextItem],
        ]);
    }
    else {
        const startCommand = [
            paintArrayMarkerBefore,
            [insertBefore, startMarker, contextItem],
        ];
        const endCommand = [
            paintArrayMarkerBefore,
            [insertBefore, endMarker, contextItem],
        ];
        paintCommands.push(startCommand, endCommand);
    }
    domProcessContextItem(value, ownerSupport, contextItem, appendTo, endMarker);
    if (appendTo) {
        paintAppends.push([
            paintArrayMarkerAppend,
            [appendTo, endMarker, contextItem],
        ]);
    }
    return contextItem;
}
function paintArrayMarkerAppend(appendTo, marker, context) {
    if (!context.arrayMarkersDeleted) {
        appendTo.appendChild(marker);
    }
}
function paintArrayMarkerBefore(insertBefore, marker, context) {
    if (context.arrayMarkersDeleted) {
        return;
    }
    const parentNode = insertBefore.parentNode;
    parentNode.insertBefore(marker, insertBefore);
}
//# sourceMappingURL=createAndProcessContextItem.function.js.map