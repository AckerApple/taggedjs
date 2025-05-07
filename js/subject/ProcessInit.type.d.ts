import { Counts } from '../interpolations/interpolateTemplate.js';
import { ContextItem } from '../tag/Context.types.js';
import { AnySupport } from '../tag/AnySupport.type.js';
export type ProcessInit = (value: any, // TemplateValue | StringTag | SubscribeValue | SignalObject,
contextItem: ContextItem, ownerSupport: AnySupport, counts: Counts, // {added:0, removed:0}
appendTo?: Element, insertBefore?: Text) => any;
