import type { Tag } from '../Tag.type.js';
import { ContextItem } from '../ContextItem.type.js';
import { AnySupport } from '../index.js';
import { TemplateValue } from '../TemplateValue.type.js';
export declare function handleStillTag(oldSupport: AnySupport, subject: ContextItem, value: Tag | TemplateValue, ownerSupport: AnySupport): void;
