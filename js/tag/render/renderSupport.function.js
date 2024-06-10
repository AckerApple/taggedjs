import { deepEqual } from '../../deepFunctions.js';
import { renderExistingTag } from './renderExistingTag.function.js';
/** Main function used by all other callers to render/update display of a tag component */
export function renderSupport(support, // must be latest/newest state render
renderUp) {
    const global = support.subject.global;
    const templater = support.templater;
    // is it just a vanilla tag, not component?
    if (!templater.wrapper) { // || isTagTemplater(templater) 
        const ownerTag = support.ownerSupport;
        ++global.renderCount;
        if (ownerTag.subject.global.deleted) {
            return support;
        }
        return renderSupport(ownerTag.subject.global.newest, true);
    }
    if (support.subject.global.locked) {
        support.subject.global.blocked.push(support);
        return support;
    }
    const subject = support.subject;
    const oldest = support.subject.global.oldest;
    let ownerSupport;
    let selfPropChange = false;
    const shouldRenderUp = renderUp && support;
    if (shouldRenderUp) {
        ownerSupport = support.ownerSupport;
        if (ownerSupport) {
            const nowProps = templater.props;
            const latestProps = support.propsConfig.latestCloned;
            selfPropChange = !deepEqual(nowProps, latestProps);
        }
    }
    const tag = renderExistingTag(oldest, support, ownerSupport, // useSupport,
    subject);
    if (ownerSupport && selfPropChange) {
        const myOwnerSupport = ownerSupport.subject.global.newest;
        renderSupport(myOwnerSupport, true);
        return tag;
    }
    return tag;
}
//# sourceMappingURL=renderSupport.function.js.map