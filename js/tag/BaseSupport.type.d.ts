import { HtmlSupport, SupportContextItem } from './createHtmlSupport.function.js';
export type BaseSupport = HtmlSupport & {
    subject: SupportContextItem;
};
