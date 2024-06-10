import { escapeVariable, variablePrefix } from './Tag.class.js';
import { deepClone } from '../deepFunctions.js';
import { isTagComponent } from '../isInstance.js';
import { cloneValueArray } from './cloneValueArray.function.js';
import { runBeforeDestroy } from './tagRunner.js';
import { getChildTagsToDestroy } from './destroy.support.js';
import { elementDestroyCheck } from './elementDestroyCheck.function.js';
import { updateContextItem } from './update/updateContextItem.function.js';
import { processNewValue } from './update/processNewValue.function.js';
import { interpolateElement, interpolateString } from '../interpolations/interpolateElement.js';
import { afterInterpolateElement } from '../interpolations/afterInterpolateElement.function.js';
const prefixSearch = new RegExp(variablePrefix, 'g');
/** used only for apps, otherwise use Support */
// TODO: We need to split Support and simple tag support apart
export class BaseSupport {
    templater;
    subject;
    isApp = true;
    appElement; // only seen on this.getAppSupport().appElement
    strings;
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
        const latestCloned = props.map(props => deepClone(props));
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
    /** Function that kicks off actually putting tags down as HTML elements */
    buildBeforeElement(fragment = document.createDocumentFragment(), options = {
        counts: { added: 0, removed: 0 },
    }) {
        const subject = this.subject;
        const global = this.subject.global;
        global.oldest = this;
        global.newest = this;
        subject.support = this;
        this.hasLiveElements = true;
        const context = this.update();
        const template = this.getTemplate();
        const tempDraw = document.createElement('template'); // put down a first element we can expect to always be there
        tempDraw.innerHTML = template.string;
        // Search/replace innerHTML variables but don't interpolate tag components just yet
        // const tagComponents = 
        interpolateElement(fragment, tempDraw, context, template, this, // ownerSupport,
        {
            counts: options.counts
        });
        afterInterpolateElement(fragment, tempDraw, this, // ownerSupport
        context, options);
        return fragment;
    }
    getTemplate() {
        const thisTag = this.templater.tag;
        const strings = this.strings || thisTag.strings;
        const values = this.values || thisTag.values;
        const lastRun = this.subject.lastRun;
        if (lastRun) {
            if (lastRun.strings.length === strings.length) {
                const stringsMatch = lastRun.strings.every((string, index) => 
                // string.length === strings[index].length
                string === strings[index]);
                if (stringsMatch && lastRun.values.length === values.length) {
                    return lastRun; // performance savings using the last time this component was rendered
                }
            }
        }
        const string = strings.map((string, index) => {
            const safeString = string.replace(prefixSearch, escapeVariable);
            const endString = safeString + (values.length > index ? `{${variablePrefix}${index}}` : '');
            // ??? new removed
            //const trimString = endString.replace(/>\s*/g,'>').replace(/\s*</g,'<')
            //return trimString
            return endString;
        }).join('');
        const interpolation = interpolateString(string);
        const run = {
            interpolation,
            string: interpolation.string,
            strings,
            values,
        };
        this.subject.lastRun = run;
        return run;
    }
    update() {
        return this.updateContext(this.subject.global.context);
    }
    updateContext(context) {
        const thisTag = this.templater.tag;
        const strings = this.strings || thisTag.strings;
        const values = this.values || thisTag.values;
        strings.forEach((_string, index) => {
            const hasValue = values.length > index;
            if (!hasValue) {
                return;
            }
            const variableName = variablePrefix + index;
            const value = values[index];
            // is something already there?
            const exists = variableName in context;
            if (exists) {
                if (this.subject.global.deleted) {
                    const valueSupport = (value && value.support);
                    if (valueSupport) {
                        valueSupport.destroy();
                        return context; // item was deleted, no need to emit
                    }
                }
                return updateContextItem(context, variableName, value);
            }
            // 🆕 First time values below
            context[variableName] = processNewValue(value, this);
            // context[variableName].global.insertBefore = this.subject.global.placeholder || this.subject.global.insertBefore
        });
        return context;
    }
    updateBy(support) {
        const tempTag = support.templater.tag;
        this.updateConfig(tempTag.strings, tempTag.values);
    }
    updateConfig(strings, values) {
        this.strings = strings;
        this.updateValues(values);
    }
    updateValues(values) {
        this.values = values;
        return this.updateContext(this.subject.global.context);
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
            resetSupport(this);
        }
        resetSupport(this);
        let mainPromise;
        const { stagger, promise } = this.destroyClones(options);
        options.stagger = stagger;
        if (promise) {
            mainPromise = promise;
        }
        if (mainPromise) {
            return mainPromise.then(async () => {
                const promises = childTags.map(kid => kid.destroyClones());
                return Promise.all(promises);
            }).then(() => options.stagger);
        }
        childTags.forEach(kid => kid.destroyClones());
        return options.stagger;
    }
    destroyClones({ stagger } = {
        stagger: 0,
    }) {
        const oldClones = this.subject.global.clones; // .toReversed()
        // check subjects that may have clones attached to them
        const promises = oldClones.map(clone => this.checkCloneRemoval(clone, stagger)).filter(x => x); // only return promises
        this.subject.global.clones.length = 0; // tag maybe used for something else
        if (promises.length) {
            return { promise: Promise.all(promises), stagger };
        }
        return { stagger };
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
    // delete global.placeholder
    global.context = {};
    delete global.oldest; // may not be needed
    delete global.newest;
    support.subject.global.childTags.length = 0;
    const subject = support.subject;
    delete subject.support;
}
//# sourceMappingURL=Support.class.js.map