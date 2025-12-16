import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../index.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { Tag } from '../Tag.type.js';
export declare function processDomTagInit(value: TemplateValue | Tag, // StringTag,
contextItem: ContextItem, // could be tag via result.tag
ownerSupport: AnySupport, // owningSupport
insertBefore?: Text, appendTo?: Element): AnySupport | undefined;
