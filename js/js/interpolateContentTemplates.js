import { interpolateTemplate } from "./interpolateTemplate.js";
const templateSearch = new RegExp('\\s*<template interpolate end id="__tagvar(\\d{1,4})"([^>]*)></template>(\\s*)');
/** Returns subscriptions[] that will need to be unsubscribed from when element is destroyed */
export function interpolateContentTemplates(element, variable, tag, options) {
    if (!element.children || element.tagName === 'TEMPLATE') {
        return []; // done
    }
    const counts = {
        added: 0,
        removed: 0,
    };
    const clones = [];
    const children = new Array(...element.children);
    if (element.tagName === 'TEXTAREA') {
        scanTextAreaValue(element);
    }
    children.forEach((child, index) => {
        const nextClones = interpolateChild(child, options, variable, tag, counts);
        if (child.tagName === 'TEXTAREA') {
            scanTextAreaValue(child);
        }
        clones.push(...nextClones);
        if (child.children) {
            const nextKids = new Array(...child.children);
            nextKids.forEach(subChild => {
                if (isRenderEndTemplate(subChild)) {
                    interpolateChild(subChild, options, variable, tag, counts);
                }
                const nextClones = interpolateContentTemplates(subChild, variable, tag, options);
                clones.push(...nextClones);
            });
        }
    });
    return clones;
}
function interpolateChild(child, options, variable, tag, counts) {
    const clones = interpolateTemplate(child, variable, tag, counts, options);
    return clones;
}
function isRenderEndTemplate(child) {
    const isTemplate = child.tagName === 'TEMPLATE';
    return isTemplate &&
        child.getAttribute('interpolate') !== undefined &&
        child.getAttribute('end') !== undefined;
}
function scanTextAreaValue(textarea) {
    const value = textarea.value;
    if (value.search(templateSearch) >= 0) {
        const match = value.match(/__tagvar(\d{1,4})/);
        const result = match ? match[0] : '';
        const token = '{' + result + '}';
        // textarea.value = token
        textarea.value = '';
        textarea.setAttribute('textVarValue', token);
    }
}
//# sourceMappingURL=interpolateContentTemplates.js.map