import { TemplaterResult } from './getTemplaterResult.function.js';
import { Props } from '../Props.js';
import { AnySupport } from './index.js';
import { ContextItem, SupportContextItem } from '../index.js';
export type PropsConfig = {
    latest: Props;
    castProps?: Props;
};
export type HtmlSupport = {
    appSupport: AnySupport;
    ownerSupport?: AnySupport;
    appElement?: Element;
    propsConfig?: PropsConfig;
    isRoot?: true;
    templater: TemplaterResult;
    returnValue?: any;
    context: ContextItem;
};
/** used only for apps, otherwise use Support */
export declare function getBaseSupport(templater: TemplaterResult, context: SupportContextItem, castedProps?: Props): AnySupport;
export type Support = AnySupport & {
    ownerSupport: AnySupport;
    appSupport: AnySupport;
};
/** Sets support states to empty array and clones props */
export declare function upgradeBaseToSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
support: AnySupport, // when appSupport not defined then this support becomes appSupport
appSupport?: AnySupport, castedProps?: Props): AnySupport;
export declare function createHtmlSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
ownerSupport: AnySupport, appSupport: AnySupport, context: ContextItem, castedProps?: Props): AnySupport;
