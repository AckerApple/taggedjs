import { isPromise } from '../../index.js';
import { paint } from '../../render/index.js';
import { blankHandler } from '../../render/dom/blankHandler.function.js';
import { checkTagValueChange } from '../checkTagValueChange.function.js';
import { makeRealUpdate, afterDestroy } from './processFirstSubjectComponent.function.js';
import { updateToDiffValue } from './updateToDiffValue.function.js';
/** Used when a tag() does not return html`` */
export function getOverrideTagVar(context, newContext, support, subject) {
    // support.context = subject as SupportContextItem
    const overrideTagVar = {
        tagJsType: 'tag-conversion',
        // processInitAttribute: newContext.tagJsVar.processInitAttribute,
        processInitAttribute: blankHandler, // cannot be an attribute ever
        processInit: (_value, _contextItem, _ownerSupport) => {
            const renderContent = context.returnValue;
            return newContext.tagJsVar.processInit(renderContent, newContext, support, subject.placeholder);
        },
        processUpdate: (value, context, ownerSupport) => {
            if (context.locked || context.deleted) {
                return;
            }
            ++context.updateCount;
            const oldValue = context.value;
            const oldType = oldValue.tagJsType;
            const newType = value?.tagJsType;
            const hasTypeChanged = newType !== oldType;
            const hasChanged = checkTagValueChange(value, context);
            // check to see if the tagConversion itself has changed
            const changed = hasChanged || hasTypeChanged || overrideTagVar.hasValueChanged(value, context, // aka contextItem,
            support);
            if (changed) {
                overrideTagVar.destroy(context, support);
                updateToDiffValue(value, context, // newContext
                ownerSupport, 789);
                return;
            }
            context.locked = 467;
            context.render$.next(); // cause tag.onRender to fire
            const convertValue = context.returnValue;
            makeRealUpdate(newContext, value, context, convertValue, support);
            delete context.locked;
        },
        hasValueChanged: (_value, _context, support) => {
            const newValue = context.returnValue;
            const checkResult = newContext.tagJsVar.hasValueChanged(newValue, newContext, support);
            return checkResult;
        },
        destroy: (contextItem, ownerSupport) => {
            ++context.updateCount;
            context.deleted = true;
            delete context.returnValue;
            const result = newContext.tagJsVar.destroy(newContext, support);
            if (isPromise(result)) {
                return result.then(() => {
                    const result = afterDestroy(context, ownerSupport);
                    paint();
                    return result;
                });
            }
            return afterDestroy(context, ownerSupport);
        }
    };
    return overrideTagVar;
}
//# sourceMappingURL=getOverrideTagVar.js.map