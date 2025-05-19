import { SupportTagGlobal, TemplaterResult } from './getTemplaterResult.function.js';
import { AdvancedContextItem, ContextItem } from './Context.types.js';
import { Props } from '../Props.js';
import { BaseSupport } from './BaseSupport.type.js';
import { AnySupport } from './AnySupport.type.js';
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
    subject: ContextItem;
};
export interface SupportContextItem extends AdvancedContextItem {
    global: SupportTagGlobal;
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: number;
}
/** used only for apps, otherwise use Support */
export declare function getBaseSupport(templater: TemplaterResult, subject: SupportContextItem, castedProps?: Props): BaseSupport;
export type Support = AnySupport & {
    ownerSupport: AnySupport;
    appSupport: BaseSupport;
};
/** Sets support states to empty array and clones props */
export declare function upgradeBaseToSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
support: BaseSupport, appSupport: AnySupport, castedProps?: Props): AnySupport;
export declare function createHtmlSupport(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
ownerSupport: AnySupport, appSupport: AnySupport, subject: ContextItem, castedProps?: Props): AnySupport;
