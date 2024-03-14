import { runBeforeRedraw, runBeforeRender } from './tagRunner';
import { setUse } from './setUse.function';
import { processTagResult } from './processTagResult.function';
export function processSubjectComponent(value, subject, template, ownerTag, options) {
    // Check if function component is wrapped in a tag() call
    // TODO: This below check not needed in production mode
    if (value.tagged !== true) {
        let name = value.wrapper.original.name || value.wrapper.original.constructor?.name;
        if (name === 'Function') {
            name = undefined;
        }
        const label = name || value.wrapper.original.toString().substring(0, 120);
        const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`);
        throw error;
    }
    const templater = value;
    templater.insertBefore = template;
    const tagSupport = value.tagSupport;
    let retag = templater.newest;
    const providers = setUse.memory.providerConfig;
    providers.ownerTag = ownerTag;
    const isFirstTime = !retag || options.forceElement;
    if (isFirstTime) {
        if (retag) {
            // runBeforeRedraw(tagSupport, retag)
            runBeforeRedraw(tagSupport, templater.oldest);
        }
        else {
            runBeforeRender(tagSupport, ownerTag);
        }
        const preClones = ownerTag.clones.map(clone => clone);
        const result = templater.renderWithSupport(tagSupport, subject.tag, ownerTag);
        retag = result.retag;
        templater.newest = retag;
        if (ownerTag.clones.length > preClones.length) {
            const myClones = ownerTag.clones.filter(fClone => !preClones.find(clone => clone === fClone));
            retag.clones.push(...myClones);
        }
    }
    ownerTag.children.push(retag);
    // TODO: this line below might be duplicative of work done in renderWithSupport
    tagSupport.templater = retag.tagSupport.templater;
    processTagResult(retag, subject, // The element set here will be removed from document. Also result.tag will be added in here
    template, // <template end interpolate /> (will be removed)
    options);
}
//# sourceMappingURL=processSubjectComponent.function.js.map