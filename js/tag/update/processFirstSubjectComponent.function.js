import { processFirstTagResult } from './processTagResult.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { getCastedProps } from '../getTagWrap.function.js';
import { createSupport } from '../createSupport.function.js';
import { renderTagOnly } from '../../render/renderTagOnly.function.js';
import { buildBeforeElement } from '../../render/buildBeforeElement.function.js';
export function processReplacementComponent(templater, subject, ownerSupport, counts) {
    const newSupport = createSupport(templater, ownerSupport, ownerSupport.appSupport, subject);
    const newPropsConfig = newSupport.propsConfig;
    if (newPropsConfig) {
        const castedProps = templater.tagJsType !== ValueTypes.tagComponent ? [] : getCastedProps(templater, newSupport);
        newPropsConfig.castProps = castedProps;
    }
    const global = subject.global;
    const support = renderTagOnly(newSupport, global.newest, // existing tag
    subject);
    buildBeforeElement(support, counts, undefined, // element for append child
    subject.placeholder);
    return support;
}
export function processFirstSubjectComponent(templater, subject, ownerSupport, counts, appendTo) {
    const newSupport = createSupport(templater, ownerSupport, ownerSupport.appSupport, subject);
    const newPropsConfig = newSupport.propsConfig;
    if (newPropsConfig) {
        const castedProps = templater.tagJsType !== ValueTypes.tagComponent ? [] : getCastedProps(templater, newSupport);
        newPropsConfig.castProps = castedProps;
    }
    const global = subject.global;
    const support = renderTagOnly(newSupport, global.newest, // existing tag
    subject);
    return processFirstTagResult(support, counts, appendTo);
}
//# sourceMappingURL=processFirstSubjectComponent.function.js.map