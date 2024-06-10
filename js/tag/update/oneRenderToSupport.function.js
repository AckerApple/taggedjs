import { TemplaterResult } from '../TemplaterResult.class.js';
import { newSupportByTemplater } from './processTag.function.js';
export function oneRenderToSupport(wrapper, subject, ownerSupport) {
    const templater = new TemplaterResult([]);
    templater.tagJsType = 'oneRender';
    const support = newSupportByTemplater(templater, ownerSupport, subject);
    let tag;
    const wrap = () => {
        templater.tag = tag || (wrapper());
        return support;
    };
    templater.wrapper = wrap;
    wrap.parentWrap = wrap;
    wrap.oneRender = true;
    wrap.parentWrap.original = wrapper;
    return support;
}
//# sourceMappingURL=oneRenderToSupport.function.js.map