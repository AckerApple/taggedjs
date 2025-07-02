/**
 * @typedef {import("taggedjs").renderTagOnly} renderTagOnly
 * @typedef {import("taggedjs").TagComponent} TagComponent
 * @typedef {import("taggedjs").Tag} Tag
 * @typedef {import("taggedjs").TagSupport} TagSupport
 * @typedef {import("taggedjs").tagElement} tagElement
 * @typedef {import("taggedjs").renderWithSupport} renderWithSupport
 * @typedef {import("taggedjs").renderTagSupport} renderTagSupport
 */
import { switchAllProviderConstructors } from "./switchAllProviderConstructors.function";
import { buildBeforeElement, destroySupport, paint } from "taggedjs";
/** @typedef {{renderTagOnly: renderTagOnly, renderSupport: renderSupport, renderWithSupport: renderWithSupport}} HmrImport */
/**
 * Used to switch out the wrappers of a subject and then render
 * @param {*} contextSubject
 * @param {TagComponent} newTag
 * @param {TagComponent} oldTag
 * @param {HmrImport} hmr
 */
export async function updateSubject(contextSubject, newTag, oldTag, hmr) {
    const global = contextSubject.global;
    const oldest = global.oldest;
    const newest = global.newest;
    const oldTemplater = oldest.templater;
    const oldWrapper = oldTemplater.wrapper;
    if (oldWrapper) {
        if (oldWrapper.original.toString() === oldTag.original.toString()) {
            oldWrapper.original = newTag.original;
            const toString = newTag.original.toString();
            const original = oldTag.original;
            // contextSupport.templater.wrapper.original.compareTo = toString
            if (original) {
                // TODO: we may not ever get in here due to above bad data typed condition
                oldTag.compareTo = toString;
            }
            // everytime an old owner tag redraws, it will use the new function
            oldTag.original = newTag.original;
            const contextWrapper = newest.templater.wrapper;
            contextWrapper.original = newTag.original;
            const newWrapper = newest.templater.wrapper;
            newWrapper.original = newTag.original;
            const strings = global.oldest.templater.tag.strings;
            const dom = global.oldest.templater.tag.dom;
            if (original.toString().includes('sections') || strings?.includes('sections')) {
                console.log('we are swapping sections......');
            }
            if (dom && findText('sections', dom)) {
                console.log('we found it!!!!');
            }
            console.log('swapping supports-----', {
                oldest,
                state: oldest?.state
            });
        }
    }
    await swapSupport(contextSubject, hmr);
}
async function swapSupport(contextSubject, hmr) {
    const global = contextSubject.global;
    const oldest = global.oldest;
    const newest = global.newest;
    const pros = global.providers;
    const prevConstructors = pros ? pros.map(provider => provider.constructMethod) : [];
    const placeholder = contextSubject.placeholder;
    await destroySupport(oldest, global);
    const reGlobal = contextSubject.global;
    delete reGlobal.deleted;
    // TODO: ISSUE I believe is here using the other context. Need to ensure handler and processors are NOT arrow functions
    const reSupport = hmr.renderTagOnly(newest, newest, contextSubject, newest.ownerSupport);
    const appSupport = oldest.appSupport;
    const ownerSupport = oldest.ownerSupport;
    const ownGlobal = ownerSupport.context.global;
    const providers = global.providers;
    const owner = ownGlobal.oldest;
    // connect child to owner
    reSupport.ownerSupport = owner;
    if (providers) {
        providers.forEach((provider, index) => {
            prevConstructors[index].compareTo = provider.constructMethod.compareTo;
            provider.constructMethod.compareTo = provider.constructMethod.toString();
            switchAllProviderConstructors(appSupport, provider);
        });
    }
    buildBeforeElement(reSupport, { added: 0, removed: 0 }, undefined, placeholder);
    recurseContext(global.contexts, reSupport);
    paint();
    reGlobal.newest = reSupport;
    reGlobal.oldest = reSupport;
}
function recurseContext(context, reSupport) {
    /*
    switch (reSupport.templater.tagJsType[0]) {
      case ValueTypes.dom[0]:
        reSupport.templater.tagJsType = ValueTypes.dom
        break
  
        case ValueTypes.templater[0]:
        reSupport.templater.tagJsType = ValueTypes.templater
        break
  
        case ValueTypes.tagComponent[0]:
        reSupport.templater.tagJsType = ValueTypes.tagComponent
        break
    }
    */
    context.forEach(contextItem => {
        /*
        if(isSubjectInstance(contextItem.value)) {
          processSubUpdate(contextItem.value, contextItem, reSupport)
        }
        */
        /*
        if(contextItem.subject) {
          processFirstSubjectValue(
            contextItem.value,
            contextItem,
            reSupport,
            {added:0, removed:0},
            `rvp_-1_${reSupport.templater.tag?.values.length}`,
            undefined // syncRun ? appendTo : undefined,
          )
        }
        */
        const nextGlobal = contextItem.global;
        if (contextItem.global) {
            const nextContext = nextGlobal?.contexts;
            if (nextContext) {
                const nextSupport = nextGlobal.newest;
                recurseContext(nextContext, nextSupport);
            }
        }
    });
}
function findText(text, dom) {
    const found = dom.find(x => {
        if (x.tc && x.tc.includes(text)) {
            return true;
        }
        if (x.ch) {
            return findText(text, x.ch);
        }
    });
    if (found) {
        return true;
    }
}
//# sourceMappingURL=updateSubject.function.js.map