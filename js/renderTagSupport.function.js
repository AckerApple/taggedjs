import { deepEqual } from './deepFunctions';
import { isTagInstance } from './isInstance';
import { renderExistingTag } from './renderExistingTag.function';
/** Main function used by all other callers to render/update display of a tag component */
export function renderTagSupport(tagSupport, renderUp) {
    const global = tagSupport.templater.global;
    if (isTagInstance(tagSupport.templater)) {
        const newTag = global.newest;
        const ownerTag = newTag.ownerTag;
        ++global.renderCount;
        return renderTagSupport(ownerTag.tagSupport, true);
    }
    // const oldTagSetup = this
    const subject = tagSupport.subject;
    const templater = tagSupport.templater; // oldTagSetup.templater // templater
    const subjectTag = subject.tag;
    const newest = subjectTag?.tagSupport.templater.global.newest;
    let ownerTag;
    let selfPropChange = false;
    if (renderUp && newest) {
        ownerTag = newest.ownerTag;
        if (ownerTag) {
            const nowProps = templater.props;
            const latestProps = newest.tagSupport.propsConfig.latestCloned;
            selfPropChange = !deepEqual(nowProps, latestProps);
        }
    }
    const useTagSupport = global.newest?.tagSupport; // oldTagSetup
    if (!templater.global.oldest) {
        throw new Error('already causing trouble');
    }
    const tag = renderExistingTag(templater.global.oldest, templater, useTagSupport, subject);
    /*
    const tag = exit.redraw
  
    if(exit.remit) {
      return tag
    }
    */
    // Have owner re-render
    // ??? - recently removed. As causes some sort of owner newest disconnect during prop testing
    // ??? - restored with condition - must render parent if I modified my props
    if (ownerTag && selfPropChange) {
        const ownerTagSupport = ownerTag.tagSupport;
        renderTagSupport(ownerTagSupport, true);
        return tag;
    }
    return tag;
}
//# sourceMappingURL=renderTagSupport.function.js.map