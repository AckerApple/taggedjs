import { SupportContextItem, AnySupport, isPromise } from '../../index.js';
import { paint } from '../../render/index.js';
import { blankHandler } from '../../render/dom/blankHandler.function.js';
import { ReadOnlyVar, TagJsVar } from '../../tagJsVars/tagJsVar.type.js';
import { checkTagValueChange } from '../checkTagValueChange.function.js';
import { ContextItem } from '../ContextItem.type.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { makeRealUpdate, afterDestroy } from './processFirstSubjectComponent.function.js';
import { updateToDiffValue } from './updateToDiffValue.function.js';

/** Used when a tag() does not return html`` */

export function getOverrideTagVar(
  context: ContextItem & SupportContextItem,
  newContext: ContextItem,
  support: AnySupport,
  subject: SupportContextItem
): ReadOnlyVar {
  // support.context = subject as SupportContextItem
  const overrideTagVar: ReadOnlyVar = {
    tagJsType: 'tag-conversion',

    // processInitAttribute: newContext.tagJsVar.processInitAttribute,
    processInitAttribute: blankHandler, // cannot be an attribute ever

    processInit: (
      _value: TemplateValue,
      _contextItem: ContextItem,
      _ownerSupport: AnySupport
    ) => {
      const renderContent = context.returnValue
      return newContext.tagJsVar.processInit(
        renderContent,
        newContext,
        support,
        subject.placeholder
      );
    },
    processUpdate: (
      value: TemplateValue,
      context: ContextItem,
      ownerSupport: AnySupport
    ) => {
      if (context.locked || context.deleted) {
        return
      }

      ++context.updateCount

      const oldValue = context.value;
      const oldType = oldValue.tagJsType;
      const newType = (value as TagJsVar)?.tagJsType;
      const hasTypeChanged = newType !== oldType;
      const hasChanged = checkTagValueChange(value, context);

      // check to see if the tagConversion itself has changed
      const changed = hasChanged || hasTypeChanged || overrideTagVar.hasValueChanged(
        value,
        context, // aka contextItem,
        support
      )

      if (changed) {
        overrideTagVar.destroy(context, support)
        
        updateToDiffValue(
          value,
          context, // newContext
          ownerSupport,
          789
        )

        return
      }

      context.locked = 467;
      context.render$.next(); // cause tag.onRender to fire

      const convertValue = context.returnValue
      makeRealUpdate(
        newContext,
        value,
        context as SupportContextItem,
        convertValue,
        support
      );

      delete context.locked;
    },
    hasValueChanged: (
      _value: unknown,
      _context: ContextItem,
      support: AnySupport,
    ) => {
      const newValue = context.returnValue
      const checkResult = newContext.tagJsVar.hasValueChanged(
        newValue,
        newContext,
        support
      )
      return checkResult
    },
    destroy: (
      contextItem: ContextItem,
      ownerSupport: AnySupport,
    ) => {
      ++context.updateCount
      context.deleted = true
      delete context.returnValue
      const result = newContext.tagJsVar.destroy(newContext, support)

      if (isPromise(result)) {
        return result.then(() => {
          const result = afterDestroy(context, ownerSupport)
          paint()
          return result
        })
      }

      return afterDestroy(context, ownerSupport)
    }
  }

  return overrideTagVar
}
