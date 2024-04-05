import { hasTagSupportChanged } from './hasTagSupportChanged.function';
import { processSubjectComponent } from './processSubjectComponent.function';
import { destroyTagMemory } from './destroyTag.function';
import { renderTagSupport } from './renderTagSupport.function';
export function updateExistingTagComponent(ownerTag, templater, subject, insertBefore) {
    let existingTag = subject.tag;
    /*
    if(existingTag && !existingTag.hasLiveElements) {
      throw new Error('issue already began')
    }
    */
    const oldWrapper = existingTag.tagSupport.templater.wrapper;
    const newWrapper = templater.wrapper;
    let isSameTag = false;
    if (templater.global.oldest && !templater.global.oldest.hasLiveElements) {
        throw new Error('88893434');
    }
    if (oldWrapper && newWrapper) {
        const oldFunction = oldWrapper.original;
        const newFunction = newWrapper.original;
        isSameTag = oldFunction === newFunction;
    }
    const oldTagSupport = existingTag.tagSupport;
    const oldGlobal = oldTagSupport.templater.global;
    const globalInsert = oldGlobal.insertBefore;
    const oldInsertBefore = globalInsert?.parentNode ? globalInsert : insertBefore;
    if (!oldInsertBefore.parentNode) {
        throw new Error('stop here no parent node update existing tag');
    }
    if (!isSameTag) {
        destroyTagMemory(oldTagSupport.templater.global.oldest, subject);
        processSubjectComponent(templater, subject, oldInsertBefore, ownerTag, {
            forceElement: false,
            counts: { added: 0, removed: 0 },
        });
        return;
    }
    else {
        const newTagSupport = templater.tagSupport;
        const hasChanged = hasTagSupportChanged(oldTagSupport, newTagSupport, templater);
        if (!hasChanged) {
            return; // its the same tag component
        }
    }
    const oldestTag = templater.global.oldest; // oldTagSupport.oldest as Tag // existingTag
    const previous = templater.global.newest;
    if (!previous || !oldestTag) {
        throw new Error('how no previous or oldest nor newest?');
    }
    const newTag = renderTagSupport(templater.tagSupport, false);
    existingTag = subject.tag;
    const newOldest = newTag.tagSupport.templater.global.oldest;
    const hasOldest = newOldest ? true : false;
    if (!hasOldest) {
        return buildNewTag(newTag, oldInsertBefore, oldTagSupport, subject);
    }
    if (newOldest && templater.children.value.length) {
        const oldKidsSub = newOldest.tagSupport.templater.children;
        oldKidsSub.set(templater.children.value);
    }
    // const newTag = tempResult.newest as Tag
    if (previous && !oldestTag) {
        throw new Error('bad elders');
    }
    // detect if both the function is the same and the return is the same
    const isLikeTag = isSameTag && previous.isLikeTag(newTag);
    if (previous && !oldestTag) {
        throw new Error('bad elders');
    }
    let oldest = oldTagSupport.templater.global.oldest;
    if (isLikeTag) {
        if (!newTag.tagSupport.templater.global.oldest) {
            throw new Error('maybe 6');
        }
        subject.tag = newTag;
        oldestTag.updateByTag(newTag); // the oldest tag has element references
        return;
    }
    else {
        // Although function looked the same it returned a different html result
        if (isSameTag && existingTag) {
            destroyTagMemory(existingTag, subject);
            newTag.tagSupport.templater.global.context = {}; // do not share previous outputs
        }
        oldest = undefined;
    }
    if (!oldest) {
        buildNewTag(newTag, oldTagSupport.templater.global.insertBefore, oldTagSupport, subject);
    }
    oldTagSupport.templater.global.newest = newTag;
    return;
}
function checkStateChanged(state) {
    return !state.newest.every(state => {
        const lastValue = state.lastValue;
        const nowValue = state.get();
        const matched = lastValue === nowValue;
        if (matched) {
            return true;
        }
        return false;
    });
}
function buildNewTag(newTag, oldInsertBefore, oldTagSupport, subject) {
    newTag.buildBeforeElement(oldInsertBefore, {
        forceElement: true,
        counts: { added: 0, removed: 0 }, test: false,
    });
    newTag.tagSupport.templater.global.oldest = newTag;
    newTag.tagSupport.templater.global.newest = newTag;
    oldTagSupport.templater.global.oldest = newTag;
    oldTagSupport.templater.global.newest = newTag;
    if (!newTag.tagSupport.templater.global.oldest) {
        throw new Error('maybe 5');
    }
    subject.tag = newTag;
    if (!newTag.hasLiveElements) {
        throw new Error('44444 - 5');
    }
    return;
}
//# sourceMappingURL=updateExistingTagComponent.function.js.map