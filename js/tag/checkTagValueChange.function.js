import { getNewGlobal } from './update/getNewGlobal.function.js';
import { destroySupport } from '../render/destroySupport.function.js';
import { isStaticTag } from '../isInstance.js';
import { isLikeTags } from './isLikeTags.function.js';
import { tryUpdateToTag } from './update/tryUpdateToTag.function.js';
import { destroySupportByContextItem } from './destroySupportByContextItem.function.js';
/** When return > 0 then its the same tag */
export function checkTagValueChange(newValue, contextItem) {
    const lastSupport = contextItem.state?.newest;
    const isValueTag = isStaticTag(newValue);
    const newTag = newValue;
    if (isValueTag) {
        // its a different tag now
        const likeTags = isLikeTags(newTag, lastSupport);
        if (!likeTags) {
            return 7; // 'tag-swap'
        }
        return 0;
    }
    const isTag = newValue?.tagJsType;
    if (isTag) {
        if (newValue.wrapper?.original === contextItem.value.wrapper?.original) {
            return 0;
        }
        return 88; // its same tag with new values
    }
    // destroySupportByContextItem(contextItem)
    return 8; // 'no-longer-tag'
}
/*
export function checkTagValueChangeAndUpdate(
  newValue: unknown,
  contextItem: ContextItem,
) {
  const checkValue = checkTagValueChange(newValue, contextItem)

  const global = contextItem.global as SupportTagGlobal
  const lastSupport = contextItem.state?.newest as AnySupport
  
  if(checkValue === 7) {
    destroySupport(lastSupport, global)
    getNewGlobal(contextItem as SupportContextItem)
    return 7 // 'tag-swap'
  }
  
  if(checkValue === 8) {
    destroySupportByContextItem(contextItem)
    return 8
  }

  const isValueTag = isStaticTag(newValue)
  if(isValueTag) {
    // always cause a redraw of static tags (was false)
    tryUpdateToTag(
      contextItem,
      newValue as TemplaterResult,
      lastSupport as AnySupport,
    )

    return 0
  }

  const isTag = (newValue as any)?.tagJsType
  if(isTag) {
    const state = contextItem.state as ContextStateMeta
    const support = state.newest as AnySupport
    const ownerSupport = support.ownerSupport as AnySupport
    const result = tryUpdateToTag(
      contextItem,
      newValue as TemplaterResult,
      ownerSupport,
    )

    const doNotRedraw = result === true

    if(doNotRedraw) {
      return 0
    }

    return 88 // its same tag with new values
  }

  destroySupportByContextItem(contextItem)
  return 8
}
*/
export function checkTagValueChangeAndUpdate(newValue, contextItem) {
    const global = contextItem.global;
    const lastSupport = contextItem.state?.newest;
    const isValueTag = isStaticTag(newValue);
    const newTag = newValue;
    if (isValueTag) {
        // its a different tag now
        const likeTags = isLikeTags(newTag, lastSupport);
        if (!likeTags) {
            destroySupport(lastSupport, global);
            getNewGlobal(contextItem);
            return 7; // 'tag-swap'
        }
        // always cause a redraw of static tags (was false)
        tryUpdateToTag(contextItem, newValue, lastSupport);
        return 0;
    }
    const isTag = newValue?.tagJsType;
    if (isTag) {
        const state = contextItem.state;
        const support = state.newest;
        const ownerSupport = support.ownerSupport;
        const result = tryUpdateToTag(contextItem, newValue, ownerSupport);
        const doNotRedraw = result === true;
        if (doNotRedraw) {
            return 0;
        }
        return 88; // its same tag with new values
    }
    destroySupportByContextItem(contextItem);
    return 8; // 'no-longer-tag'
}
//# sourceMappingURL=checkTagValueChange.function.js.map