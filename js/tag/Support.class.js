import { ValueTypes } from './ValueTypes.enum.js';
import { deepClone } from '../deepFunctions.js';
import { isTagComponent } from '../isInstance.js';
import { cloneTagJsValue, cloneValueArray } from './cloneValueArray.function.js';
import { runBeforeDestroy } from './tagRunner.js';
import { getChildTagsToDestroy } from './destroy.support.js';
import { elementDestroyCheck } from './elementDestroyCheck.function.js';
import { updateContextItem } from './update/updateContextItem.function.js';
import { processNewValue } from './update/processNewValue.function.js';
import { exchangeParsedForValues } from '../interpolations/optimizers/htmlInterpolationToDomMeta.function.js';
import { attachDomElement } from '../interpolations/optimizers/metaAttachDomElements.function.js';
import { getDomMeta } from './domMetaCollector.js';
/** used only for apps, otherwise use Support */
// TODO: We need to split Support and simple tag support apart
export class BaseSupport {
    templater;
    subject;
    isApp = true;
    appElement; // only seen on this.getAppSupport().appElement
    strings;
    dom;
    values;
    propsConfig;
    // stays with current render
    state = [];
    hasLiveElements = false;
    constructor(templater, subject, castedProps) {
        this.templater = templater;
        this.subject = subject;
        const props = templater.props; // natural props
        this.propsConfig = this.clonePropsBy(props, castedProps);
    }
    clonePropsBy(props, castedProps) {
        const children = this.templater.children; // children tags passed in as arguments
        const kidValue = children.value;
        const latestCloned = props.map(props => cloneTagJsValue(props)
        // deepClone(props)
        );
        return this.propsConfig = {
            latest: props,
            latestCloned, // assume its HTML children and then detect
            castProps: castedProps,
            lastClonedKidValues: kidValue.map(kid => {
                const cloneValues = cloneValueArray(kid.values);
                return cloneValues;
            })
        };
    }
    getHtmlDomMeta(fragment, options = {
        counts: { added: 0, removed: 0 },
    }) {
        const thisTag = this.templater.tag;
        const context = this.update();
        let orgDomMeta;
        if (thisTag.tagJsType === ValueTypes.dom) {
            orgDomMeta = thisTag.dom;
        }
        else {
            orgDomMeta = getDomMeta(thisTag.strings, thisTag.values);
        }
        const domMeta = deepClone(orgDomMeta);
        exchangeParsedForValues(domMeta, context);
        attachDomElement(domMeta, context, this, fragment, options.counts, fragment);
        return domMeta;
    }
    /** Function that kicks off actually putting tags down as HTML elements */
    buildBeforeElement(fragment = document.createDocumentFragment(), options) {
        const subject = this.subject;
        const global = this.subject.global;
        global.oldest = this;
        global.newest = this;
        subject.support = this;
        this.hasLiveElements = true;
        const htmlDomMeta = this.getHtmlDomMeta(fragment, options);
        attachClonesToSupport(htmlDomMeta, this.subject.global.clones);
        return fragment;
    }
    updateBy(support) {
        const tempTag = support.templater.tag;
        this.updateConfig(tempTag, tempTag.values);
    }
    /** triggers values to render */
    updateConfig(tag, values) {
        if (tag.tagJsType === ValueTypes.dom) {
            this.dom = tag.dom;
        }
        else {
            this.strings = tag.strings;
        }
        this.updateValues(values);
    }
    updateValues(values) {
        this.values = values;
        return this.updateContext(this.subject.global.context);
    }
    update() {
        return this.updateContext(this.subject.global.context);
    }
    updateContext(context) {
        const thisTag = this.templater.tag;
        // const strings = this.strings || thisTag.strings
        const values = this.values || thisTag.values;
        // TODO: loop specific number of times instead of building an array
        const array = 'x,'.repeat(values.length).split(','); // strings
        array.forEach((_string, index) => updateOneContext(values, index, context, this));
        return context;
    }
    destroy(options = {
        stagger: 0,
    }) {
        const global = this.subject.global;
        const childTags = options.byParent ? [] : getChildTagsToDestroy(this.subject.global.childTags); // .toReversed()
        if (isTagComponent(this.templater)) {
            global.destroy$.next();
            runBeforeDestroy(this, this);
        }
        this.destroySubscriptions();
        // signify immediately child has been deleted (looked for during event processing)
        for (let index = childTags.length - 1; index >= 0; --index) {
            const child = childTags[index];
            const subGlobal = child.subject.global;
            delete subGlobal.newest;
            subGlobal.deleted = true;
            if (isTagComponent(child.templater)) {
                runBeforeDestroy(child, child);
            }
            child.destroySubscriptions();
            // resetSupport(this)
        }
        resetSupport(this);
        // let mainPromise: Promise<number | (number | void | undefined)[]> | undefined    
        // first paint
        const { stagger, promises } = this.smartRemoveKids(options);
        options.stagger = stagger;
        if (promises.length) {
            return Promise.all(promises).then(() => options.stagger);
        }
        return options.stagger;
    }
    smartRemoveKids(options = {
        stagger: 0,
    }) {
        const startStagger = options.stagger;
        const promises = [];
        const myClones = this.subject.global.clones;
        this.subject.global.childTags.forEach(childTag => {
            const clones = childTag.subject.global.clones;
            let cloneOne = clones[0];
            if (cloneOne === undefined) {
                const { stagger, promises: newPromises } = childTag.smartRemoveKids(options);
                options.stagger = options.stagger + stagger;
                promises.push(...newPromises);
                return { promise: Promise.all(promises), stagger: options.stagger };
            }
            let count = 0;
            // let deleted = false
            while (cloneOne.parentNode && count < 5) {
                if (myClones.includes(cloneOne)) {
                    return; // no need to delete, they live within me
                }
                cloneOne = cloneOne.parentNode;
                ++count;
            }
            // recurse
            const { stagger, promises: newPromises } = childTag.smartRemoveKids(options);
            options.stagger = options.stagger + stagger;
            promises.push(...newPromises);
        });
        const promise = this.destroyClones({ stagger: startStagger }).promise;
        this.subject.global.clones.length = 0;
        this.subject.global.childTags.length = 0;
        if (promise) {
            promises.unshift(promise);
        }
        return { promises, stagger: options.stagger };
    }
    destroyClones(options = {
        stagger: 0,
    }) {
        const oldClones = this.subject.global.clones; // .toReversed()
        // check subjects that may have clones attached to them
        const promises = oldClones.map(clone => this.checkCloneRemoval(clone, options.stagger)).filter(x => x); // only return promises
        if (promises.length) {
            return { promise: Promise.all(promises), stagger: options.stagger };
        }
        return { stagger: options.stagger };
    }
    /** Reviews elements for the presences of ondestroy */
    checkCloneRemoval(clone, stagger) {
        let promise;
        const customElm = clone;
        if (customElm.ondestroy) {
            promise = elementDestroyCheck(customElm, stagger);
        }
        if (promise instanceof Promise) {
            return promise.then(() => {
                const parentNode = clone.parentNode;
                // TODO: we need to remove this IF
                if (parentNode) {
                    parentNode.removeChild(clone);
                }
            });
        }
        const parentNode = clone.parentNode;
        if (parentNode) {
            parentNode.removeChild(clone);
        }
        const ownerSupport = this.ownerSupport;
        if (ownerSupport) {
            const clones = ownerSupport.subject.global.clones;
            const index = clones.indexOf(clone);
            if (index >= 0) {
                clones.splice(index, 1);
            }
        }
        return promise;
    }
    destroySubscriptions() {
        const subs = this.subject.global.subscriptions;
        for (let index = subs.length - 1; index >= 0; --index) {
            subs[index].unsubscribe();
        }
        subs.length = 0;
    }
}
export class Support extends BaseSupport {
    templater;
    ownerSupport;
    subject;
    version;
    isApp = false;
    constructor(templater, // at runtime rendering of a tag, it needs to be married to a new Support()
    ownerSupport, subject, castedProps, version = 0) {
        super(templater, subject, castedProps);
        this.templater = templater;
        this.ownerSupport = ownerSupport;
        this.subject = subject;
        this.version = version;
    }
    getAppSupport() {
        let tag = this;
        while (tag.ownerSupport) {
            tag = tag.ownerSupport;
        }
        return tag;
    }
}
export function resetSupport(support) {
    const global = support.subject.global;
    // TODO: We maybe able to replace with: global.context.length = 0
    global.context = [];
    delete global.oldest; // may not be needed
    delete global.newest;
    const subject = support.subject;
    delete subject.support;
}
function updateOneContext(values, index, context, support) {
    const hasValue = values.length > index;
    if (!hasValue) {
        return;
    }
    const value = values[index];
    // is something already there?
    const exists = context.length > index;
    if (exists) {
        if (support.subject.global.deleted) {
            const valueSupport = (value && value.support);
            if (valueSupport) {
                valueSupport.destroy();
                return context; // item was deleted, no need to emit
            }
        }
        return updateContextItem(context, index, value);
    }
    // 🆕 First time values below
    context[index] = processNewValue(value, support);
}
function attachClonesToSupport(htmlDomMeta, clones) {
    htmlDomMeta.forEach(meta => {
        if (meta.domElement) {
            clones.push(meta.domElement);
        }
        clones.push(meta.marker);
        if ('children' in meta) {
            const children = meta.children;
            attachClonesToSupport(children, clones);
        }
    });
}
//# sourceMappingURL=Support.class.js.map