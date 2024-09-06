import { processTagResult } from './processTagResult.function.js';
import { Support } from '../Support.class.js';
import { setupNewSupport } from './processTag.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { renderWithSupport } from '../render/renderWithSupport.function.js';
export function processFirstSubjectComponent(templater, subject, ownerSupport, options) {
    // TODO: This below check not needed in production mode
    validateTemplater(templater);
    const newSupport = new Support(templater, ownerSupport, subject);
    setupNewSupport(newSupport, ownerSupport, subject);
    const { support } = renderWithSupport(newSupport, subject.support, // existing tag
    subject, ownerSupport);
    processTagResult(support, subject, // The element set here will be removed from document. Also result.tag will be added in here
    options);
    ownerSupport.subject.global.childTags.push(newSupport);
    return support;
}
function validateTemplater(templater) {
    // Check if function component is wrapped in a tag() call
    const notTag = templater.tagJsType !== ValueTypes.stateRender && templater.tagged !== true;
    if (notTag) {
        const wrapper = templater.wrapper;
        const original = wrapper?.parentWrap.original || templater;
        let name = original.name || original.constructor?.name;
        if (name === 'Function') {
            name = undefined;
        }
        const label = name || original.toString().substring(0, 120);
        const error = new Error(`Not a tag component. Wrap your function with tag(). Example tag(props => html\`\`) on component:\n\n${label}\n\n`);
        throw error;
    }
}
//# sourceMappingURL=processSubjectComponent.function.js.map