import type { TagCounts } from '../TagCounts.type.js';
import { AnySupport } from '../AnySupport.type.js';
import { SubContext } from './SubContext.type.js';
import { TemplateValue } from '../TemplateValue.type.js';
export declare function onFirstSubContext(value: TemplateValue, subContext: SubContext, ownerSupport: AnySupport, // ownerSupport ?
counts: TagCounts, // used for animation stagger computing
insertBefore: Text): void;
