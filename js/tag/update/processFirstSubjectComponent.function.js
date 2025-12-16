import { processFirstTagResult } from './processTagResult.function.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { getCastedProps } from '../getTagWrap.function.js';
import { createSupport } from '../createSupport.function.js';
import { firstTagRender } from '../../render/renderTagOnly.function.js';
import { buildBeforeElement } from '../../render/buildBeforeElement.function.js';
import { castProps } from '../props/alterProp.function.js';
import { convertTagToElementManaged } from './convertTagToElementManaged.function.js';
import { removeContextInCycle, setContextInCycle } from '../cycles/setContextInCycle.function.js';
function createSupportWithProps(templater, subject, ownerSupport) {
    const newSupport = createSupport(templater, subject, ownerSupport, ownerSupport?.appSupport);
    const newPropsConfig = newSupport.propsConfig;
    if (newPropsConfig) {
        const castedProps = templater.tagJsType !== ValueTypes.tagComponent ? [] : getCastedProps(templater, newSupport);
        newPropsConfig.castProps = castedProps;
    }
    const support = firstTagRender(newSupport, subject.state.newest, // existing tag
    subject);
    return support;
}
export function processReplacementComponent(templater, context, ownerSupport) {
    const support = createSupportWithProps(templater, context, ownerSupport);
    const tag = support.templater.tag;
    if (!['dom', 'html'].includes(tag.tagJsType)) {
        return convertTagToElementManaged(support, support.ownerSupport, context);
    }
    buildBeforeElement(support, undefined, // element for append child
    context.placeholder);
    return support;
}
export function makeRealUpdate(newContext, value, context, convertValue, support) {
    const castedProps = castProps(value.props, support, // ownerSupport,
    0);
    newContext.value.props = castedProps;
    const propsConfig = support.propsConfig;
    if (propsConfig) {
        propsConfig.castProps = castedProps;
    }
    ;
    newContext.updatesHandler = context.updatesHandler;
    if (context.updatesHandler) {
        setContextInCycle(context);
        const updatesHandler = context.updatesHandler;
        updatesHandler(castedProps); // updates()
        removeContextInCycle();
    }
    newContext.tagJsVar.processUpdate(convertValue, newContext, support, []);
    newContext.value = convertValue;
}
export function afterDestroy(context, _ownerSupport) {
    delete context.returnValue;
    delete context.global // = {} as any;
    ;
    context.contexts = [];
    ;
    context.htmlDomMeta = [];
    delete context.updatesHandler;
    // context.value.destroy(context, ownerSupport)
}
export function processFirstSubjectComponent(templater, subject, ownerSupport, appendTo) {
    const support = createSupportWithProps(templater, subject, ownerSupport);
    // DISCOVER IF tag() did NOT return dom|html
    const tag = support.templater.tag;
    if (!['dom', 'html'].includes(tag.tagJsType)) {
        return convertTagToElementManaged(support, ownerSupport, subject);
    }
    return processFirstTagResult(support, appendTo);
}
//# sourceMappingURL=processFirstSubjectComponent.function.js.map