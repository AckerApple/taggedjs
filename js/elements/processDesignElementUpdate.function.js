import { updateToDiffValue } from '../tag/update/updateToDiffValue.function.js';
import { destroyDesignElement } from './destroyDesignElement.function.js';
export function processDesignElementUpdate(value, context, ownerSupport) {
    const skip = context.locked || context.deleted === true;
    if (skip) {
        return; // something else is running an event
    }
    ++context.updateCount;
    const hasChanged = checkTagElementValueChange(value, context);
    if (hasChanged) {
        destroyDesignElement(context, ownerSupport);
        // delete context.htmlDomMeta // The next value needs to know its not been deleted
        context.htmlDomMeta = []; // The next value needs to know its not been deleted
        // context.deleted = true // its not deleted but changed
        delete context.deleted; // its not deleted but changed
        updateToDiffValue(value, context, // newContext,
        ownerSupport, 789);
        return;
    }
    const contexts = context.contexts;
    const vContexts = value.contexts || [];
    const ogListeners = context.tagJsVar.allListeners;
    const allListeners = value.allListeners;
    allListeners.forEach((newListener, index) => {
        // ensure the latest callback is always called. Needed for functions within array maps
        const wrapCallback = ogListeners[index][1];
        wrapCallback.toCallback = newListener[1].toCallback;
    });
    if (contexts.length !== vContexts.length) {
        console.info('context mismatch', {
            value,
            context,
            conValues: contexts.map(x => x.value),
            vContexts,
            deleted: context.deleted
        });
        throw new Error('super issue discovered');
    }
    context.locked = 79;
    contexts.forEach((context, index) => {
        context.tagJsVar.processUpdate(vContexts[index], // context.value,
        context, ownerSupport);
    });
    delete context.locked;
}
export function checkTagElementValueChange(value, context) {
    const oldValue = context.value;
    if (oldValue === value) {
        return 0; // has not changed
    }
    // return 1 // it has changed
    const notElement = !value || value.tagJsType !== 'element';
    if (notElement) {
        return 1;
    }
    const newContentId = value.contentId;
    const oldContentId = context.value.contentId;
    if (newContentId !== oldContentId) {
        return 1;
    }
    const newKidLength = value.innerHTML.length;
    const oldKidLength = context.value.innerHTML.length;
    const kidLengthChanged = newKidLength !== oldKidLength;
    if (kidLengthChanged) {
        return 1;
    }
    return 0;
}
//# sourceMappingURL=processDesignElementUpdate.function.js.map