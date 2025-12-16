import { ContextItem } from '../../tag/ContextItem.type.js';
import { AnySupport } from '../../tag/index.js';
import { TemplateValue } from '../../tag/TemplateValue.type.js';
export declare function processRenderOnceInit(value: TemplateValue, contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
insertBefore?: Text, appendTo?: Element): AnySupport;
