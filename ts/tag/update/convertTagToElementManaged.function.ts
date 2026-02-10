import { AnySupport, SupportContextItem, Subject } from '../../index.js';
import { valueToTagJsVar } from '../../TagJsTags/index.js';
import { ReadOnlyVar } from '../../TagJsTags/TagJsTag.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { getOverrideTagVar } from './getOverrideTagVar.js';

export function convertTagToElementManaged(
  support: AnySupport,
  ownerSupport: AnySupport,
  subject: SupportContextItem
) {
  const context = support.context
  const newValue = support.returnValue // context.returnValue

  // EXAMPLE: ['a','b'].map(x=> tag(() => [div,span]).key(x))
  /*
  if(Array.isArray(newValue)) {
    ;(newValue as any).key = (arrayValue: any) => keyTag(arrayValue, newValue)
  }
  */
  const tagJsVar = valueToTagJsVar(newValue)
  delete (context as ContextItem).global
  context.contexts = []

  const newContext: ContextItem = {
    updateCount: 0,
    value: newValue,
    tagJsVar,
    destroy$: new Subject<void>(),
    render$: new Subject<void>(),
    // paintCommands: [],
    placeholder: context.placeholder,

    // not important
    valueIndex: -1,
    withinOwnerElement: true,
    
    parentContext: context,
    contexts: context.contexts, // share contexts especially so providers properly crawl my available contexts
    // contexts: subject.contexts, // share contexts especially so providers properly crawl my available contexts
  };

  // context.contexts = [ newContext ] as ContextItem[] & SupportContextItem[]

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
