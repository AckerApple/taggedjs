import { AnySupport } from '../index.js';
import { SubContext } from './SubContext.type.js';
import { TemplateValue } from '../TemplateValue.type.js';
import { ContextItem } from '../ContextItem.type.js';
export declare function onFirstSubContext(value: TemplateValue, subContext: SubContext, ownerSupport: AnySupport, // ownerSupport ?
insertBefore: Text): ContextItem;
