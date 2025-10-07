import { AnySupport, SupportContextItem, Subject } from '../../index.js';
import { valueToTagJsVar } from '../../tagJsVars/index.js';
import { ReadOnlyVar } from '../../tagJsVars/tagJsVar.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { getOverrideTagVar } from './processFirstSubjectComponent.function.js';

export function convertTagToElementManaged(
  support: AnySupport,
  ownerSupport: AnySupport,
  subject: SupportContextItem
) {
  const context = support.context;
  const newValue = context.toRender || context.returnValue;

  // EXAMPLE: ['a','b'].map(x=> tag(() => [div,span]).key(x))
  /*
  if(Array.isArray(newValue)) {
    ;(newValue as any).key = (arrayValue: any) => keyTag(arrayValue, newValue)
  }
  */
  const tagJsVar = valueToTagJsVar(newValue);
  delete (context as ContextItem).global;

  const newContext: ContextItem = {
    updateCount: 0,
    value: newValue,
    tagJsVar,
    destroy$: new Subject<void>(),
    placeholder: context.placeholder,

    // not important
    valueIndex: -1,
    withinOwnerElement: true,
    
    parentContext: context,
    contexts: [],
  };

  const overrideTagVar: ReadOnlyVar = getOverrideTagVar(
    context,
    newContext,
    support,
    subject
  );

  context.tagJsVar = overrideTagVar;

  // TODO: should we be calling this here?
  tagJsVar.processInit(
    newValue,
    newContext,
    support,
    subject.placeholder
  );

  return support;
}
