import { TemplaterResult } from './getTemplaterResult.function.js';
import { Props } from '../Props.js';
import { BaseSupport } from './BaseSupport.type.js';
import { AnySupport } from './AnySupport.type.js';
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
    templater: TemplaterResult;
    context: ContextItem;
};
/** used only for apps, otherwise use Support */
export declare function getBaseSupport(templater: TemplaterResult, context: SupportContextItem, castedProps?: Props): BaseSupport;
export type Support = AnySupport & {
    ownerSupport: AnySupport;
    appSupport: BaseSupport;
};
/** Sets support states to empty array and clones props */
export declare function upgradeBaseToSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
support: BaseSupport, appSupport: AnySupport, castedProps?: Props): AnySupport;
export declare function createHtmlSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
ownerSupport: AnySupport, appSupport: AnySupport, context: ContextItem, castedProps?: Props): AnySupport;
