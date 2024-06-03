import { deepEqual } from '../../deepFunctions.js';
import { renderExistingTag } from './renderExistingTag.function.js';
/** Main function used by all other callers to render/update display of a tag component */
export function renderTagSupport(tagSupport, // must be latest/newest state render
renderUp) {
    const global = tagSupport.global;
    const templater = tagSupport.templater;
    if (tagSupport.global.deleted) {
        throw new Error('look no further');
    }
    // is it just a vanilla tag, not component?
    if (!templater.wrapper) { // || isTagTemplater(templater) 
        const ownerTag = tagSupport.ownerTagSupport;
        ++global.renderCount;
        if (ownerTag.global.deleted) {
            return tagSupport;
        }
        return renderTagSupport(ownerTag, true);
    }
    const subject = tagSupport.subject;
    const oldest = tagSupport.global.oldest;
    let ownerSupport;
    let selfPropChange = false;
    const shouldRenderUp = renderUp && tagSupport;
    if (shouldRenderUp) {
        ownerSupport = tagSupport.ownerTagSupport;
        if (ownerSupport) {
            const nowProps = templater.props;
            const latestProps = tagSupport.propsConfig.latestCloned;
            selfPropChange = !nowProps.every((props, index) => deepEqual(props, latestProps[index]));
        }
    }
    const tag = renderExistingTag(oldest, tagSupport, ownerSupport, // useTagSupport,
    subject);
    const renderOwner = ownerSupport && selfPropChange;
    if (renderOwner) {
        const ownerTagSupport = ownerSupport;
        renderTagSupport(ownerTagSupport, true);
        return tag;
    }
    return tag;
}
//# sourceMappingURL=renderTagSupport.function.js.map