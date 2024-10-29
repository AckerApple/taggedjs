import { SupportTagGlobal, TemplaterResult } from './TemplaterResult.class.js';
import { ContextItem } from './Context.types.js';
import { Props } from '../Props.js';
import { BaseSupport } from './BaseSupport.type.js';
export type AnySupport = (BaseSupport & {});
export type PropsConfig = {
    latest: Props;
    castProps?: Props;
};
export type HtmlSupport = {
    appSupport: BaseSupport;
    ownerSupport?: AnySupport;
    appElement?: Element;
    propsConfig?: PropsConfig;
    templater: TemplaterResult;
    subject: ContextItem;
};
export type SupportContextItem = ContextItem & {
    global: SupportTagGlobal;
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: number;
};
/** used only for apps, otherwise use Support */
export declare function getBaseSupport(templater: TemplaterResult, subject: SupportContextItem, castedProps?: Props): AnySupport;
export type Support = AnySupport & {
    ownerSupport: AnySupport;
    appSupport: BaseSupport;
};
export declare function getSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
ownerSupport: AnySupport, appSupport: BaseSupport, subject: ContextItem, castedProps?: Props): AnySupport;
export declare function getHtmlSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
ownerSupport: AnySupport, appSupport: BaseSupport, subject: ContextItem, castedProps?: Props): AnySupport;
