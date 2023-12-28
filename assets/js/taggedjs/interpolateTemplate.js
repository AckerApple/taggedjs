import { variablePrefix } from "./Tag.class.js";
import { processTagArray } from "./processTagArray.js";
import { getTagSupport } from "./getTagSupport.js";
import { deepClone, deepEqual } from "./deepFunctions.js";
import { config as providers } from "./providers.js";
import { elementInitCheck } from "./elementInitCheck.js";
import { runBeforeRender } from "./tagRunner.js";
import { isSubjectInstance, isTagComponent, isTagInstance } from "./isInstance.js";
export function interpolateTemplate(template, // <template end interpolate /> (will be removed)
context, // variable scope of {`__tagVar${index}`:'x'}
ownerTag, // Tag class
counts) {
    if (!template.hasAttribute('end')) {
        return; // only care about starts
    }
    const variableName = template.getAttribute('id');
    if (variableName?.substring(0, variablePrefix.length) !== variablePrefix) {
        return; // ignore, not a tagVar
    }
    const result = context[variableName];
    // TODO: Need to just check if it can be subscribed to
    if (isSubjectInstance(result)) {
        const callback = (templateNewValue) => {
            processSubjectValue(templateNewValue, result, template, ownerTag, counts);
            setTimeout(() => {
                counts.added = 0; // reset
                counts.removed = 0; // reset
            }, 0);
        };
        const sub = result.subscribe(callback);
        ownerTag.cloneSubs.push(sub);
        return;
    }
    const clone = updateBetweenTemplates(result, template.clone || template);
    ownerTag.clones.push(clone);
    template.clone = clone;
    return;
}
/**
 *
 * @param {*} value
 * @param {*} result
 * @param {*} template
 * @param {Tag} ownerTag
 * @param {{added: number, removed: number}} counts
 * @returns
 */
function processSubjectValue(value, result, // could be tag via result.tag
template, // <template end interpolate /> (will be removed)
ownerTag, counts) {
    if (isTagInstance(value)) {
        // first time seeing this tag?
        if (!value.tagSupport) {
            value.tagSupport = getTagSupport();
            value.tagSupport.mutatingRender = ownerTag.tagSupport.mutatingRender;
            value.tagSupport.oldest = value.tagSupport.oldest || value;
            ownerTag.children.push(value);
            value.ownerTag = ownerTag;
        }
        // value.tagSupport.newest = value
        processTagResult(value, result, // Function will attach result.tag
        template, { counts });
        return;
    }
    // *for map
    if (value instanceof Array && value.every(x => isTagInstance(x))) {
        return processTagArray(result, value, template, ownerTag, counts);
    }
    if (isTagComponent(value)) {
        return processSubjectComponent(value, result, template, ownerTag, counts);
    }
    // *if processing WAS a tag BUT NOW its some other non-tag value
    if (result.tag) {
        // put the template back
        const lastFirstChild = template.clone || template; // result.tag.clones[0] // template.lastFirstChild
        lastFirstChild.parentNode.insertBefore(template, lastFirstChild);
        const stagger = counts.removed;
        const tag = result.tag;
        const animated = tag.destroy({ stagger });
        counts.removed = stagger + animated;
        delete result.tag;
        const clone = updateBetweenTemplates(value, lastFirstChild // ✅ this will be removed
        ); // the template will be remove in here
        template.clone = clone;
        return;
    }
    const before = template.clone || template; // Either the template is on the doc OR its the first element we last put on doc
    // Processing of regular values
    const clone = updateBetweenTemplates(value, before);
    template.clone = clone;
    const oldPos = ownerTag.clones.indexOf(before);
    if (oldPos >= 0 && !ownerTag.clones.includes(clone) && !before.parentNode) {
        ownerTag.clones.splice(oldPos, 1);
        ownerTag.clones.push(clone);
    }
}
// Function to update the value of x
export function updateBetweenTemplates(value, lastFirstChild) {
    const parent = lastFirstChild.parentNode;
    // mimic React skipping to display EXCEPT for true does display on page
    if (value === undefined || value === false || value === null) { // || value === true
        value = '';
    }
    // Insert the new value (never use innerHTML here)
    const textNode = document.createTextNode(value); // never innerHTML
    parent.insertBefore(textNode, lastFirstChild);
    /* remove existing nodes */
    parent.removeChild(lastFirstChild);
    return textNode;
}
/** Returns {clones:[], subs:[]} */
export function processTagResult(tag, result, // used for recording past and current value
insertBefore, // <template end interpolate />
{ index, counts, }) {
    // *for
    if (index !== undefined) {
        const existing = result.lastArray[index];
        if (existing?.tag.isLikeTag(tag)) {
            existing.tag.updateByTag(tag);
            return;
        }
        const lastFirstChild = insertBefore; // tag.clones[0] // insertBefore.lastFirstChild
        tag.buildBeforeElement(lastFirstChild, { counts });
        result.lastArray.push({
            tag, index
        });
        return;
    }
    // *if appears we already have seen
    if (result.tag) {
        console.log('retag', result.tag.isLikeTag(tag), result.tag, tag);
        // are we just updating an if we already had?
        if (result.tag.isLikeTag(tag)) {
            // components
            if (result instanceof Function) {
                const newTag = result(result.tag.tagSupport);
                result.tag.updateByTag(newTag);
                return;
            }
            result.tag.updateByTag(tag);
            return;
        }
    }
    // *if just now appearing to be a Tag
    const before = insertBefore.clone || insertBefore;
    const tagSupport = tag.tagSupport;
    const templater = tagSupport.templater;
    const wrapper = templater?.wrapper;
    const original = wrapper?.original;
    const name = original?.name;
    console.log('new tag', name || original, { wrapper, templater, tagSupport });
    tag.buildBeforeElement(before, { counts });
    result.tag = tag; // let reprocessing know we saw this previously as an if
    return;
}
function processSubjectComponent(value, result, template, ownerTag, counts) {
    const anyValue = value;
    if (anyValue.tagged !== true) {
        let name = anyValue.name || anyValue.constructor?.name;
        if (name === 'Function') {
            name = undefined;
        }
        const label = name || anyValue.toString().substring(0, 120);
        const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`);
        throw error;
    }
    const templater = value;
    const tagSupport = result.tagSupport || getTagSupport(templater);
    tagSupport.mutatingRender = () => {
        const preRenderCount = tagSupport.renderCount;
        // Is this NOT my first render
        if (result.tag) {
            providersChangeCheck(result.tag);
            // When the providers were checked, a render to myself occurred and I do not need to re-render again
            if (preRenderCount !== tagSupport.renderCount) {
                return tagSupport.newest;
            }
            const hasPropsChanged = tagSupport.hasPropChanges(templater.props, templater.newProps, result.tag.tagSupport.templater.props);
            if (!hasPropsChanged) {
                tagSupport.newest = templater.redraw(templater.newProps); // No change detected, just redraw me only
                return tagSupport.newest;
            }
        }
        // draw to my parent
        const newest = tagSupport.newest = ownerTag.tagSupport.render();
        return newest;
    };
    let tag = templater.newest;
    providers.ownerTag = ownerTag;
    const isFirstTime = !tag;
    runBeforeRender(tagSupport, tag);
    if (isFirstTime) {
        tag = templater.forceRenderTemplate(tagSupport, ownerTag);
    }
    ownerTag.children.push(tag);
    tag.setSupport(tagSupport);
    processTagResult(tag, result, // The element set here will be removed from document
    template, // <template end interpolate /> (will be removed)
    {
        counts,
    });
    return;
}
export function afterElmBuild(elm, options) {
    if (!elm.getAttribute) {
        return;
    }
    if (!options.rebuilding) {
        elementInitCheck(elm, options.counts);
    }
    if (elm.children) {
        new Array(...elm.children).forEach(child => afterElmBuild(child, options));
    }
}
function providersChangeCheck(tag) {
    const providersWithChanges = tag.providers.filter(provider => {
        return !deepEqual(provider.instance, provider.clone);
    });
    // reset clones
    providersWithChanges.forEach(provider => {
        const appElement = tag.getAppElement();
        handleProviderChanges(appElement, provider);
        provider.clone = deepClone(provider.instance);
    });
}
/**
 *
 * @param {Tag} appElement
 * @param {Provider} provider
 */
function handleProviderChanges(appElement, provider) {
    const tagsWithProvider = getTagsWithProvider(appElement, provider);
    tagsWithProvider.forEach(({ tag, renderCount, provider }) => {
        if (renderCount === tag.tagSupport.renderCount) {
            provider.clone = deepClone(provider.instance);
            tag.tagSupport.render();
        }
    });
}
/**
 *
 * @param {Tag} appElement
 * @param {Provider} provider
 * @returns {{tag: Tag, renderCount: numer, provider: Provider}[]}
 */
function getTagsWithProvider(tag, provider, memory = []) {
    const hasProvider = tag.providers.find(xProvider => xProvider.constructMethod === provider.constructMethod);
    if (hasProvider) {
        memory.push({
            tag,
            renderCount: tag.tagSupport.renderCount,
            provider: hasProvider
        });
    }
    tag.children.forEach(child => getTagsWithProvider(child, provider, memory));
    return memory;
}
//# sourceMappingURL=interpolateTemplate.js.map