import { SupportContextItem } from '../tag/SupportContextItem.type.js'
import { AnySupport, ValueTypes, TagWrapper, Wrapper } from '../tag/index.js'
import { createSupport } from '../tag/createSupport.function.js'
import { executeWrap } from './executeWrap.function.js'
import { runAfterSupportRender } from './runAfterRender.function.js'

export function callTag(
  newSupport: AnySupport,
  prevSupport: AnySupport | undefined, // causes restate
  context: SupportContextItem,
  ownerSupport?: AnySupport
) {
  let reSupport: AnySupport;
  const templater = newSupport.templater;

  // NEW TAG CREATED HERE
  if (templater.tagJsType === ValueTypes.stateRender) {
    const result = templater as any as TagWrapper<any>; // .wrapper as any// || {original: templater} as any

    reSupport = createSupport(
      templater,
      ownerSupport as AnySupport,
      newSupport.appSupport, // ownerSupport.appSupport as AnySupport,
      context
    );

    executeWrap(
      templater,
      result,
      reSupport
    );
  } else {
    // functions wrapped in tag()
    const wrapper = templater.wrapper as Wrapper;

    // calls the function returned from getTagWrap()
    reSupport = wrapper(
      newSupport,
      context,
      prevSupport
    );
  }

  runAfterSupportRender(reSupport, ownerSupport);

  reSupport.ownerSupport = newSupport.ownerSupport; // || lastOwnerSupport) as AnySupport

  return reSupport;
}
