import { AnySupport } from "../../tag/AnySupport.type.js";
import type { TagCounts } from '../../tag/TagCounts.type.js';
import { SpecialDefinition } from "../../render/attributes/Special.types.js";
/** handles init, destroy, autofocus, autoselect, style., class. */
export declare function specialAttribute(name: string, value: any, element: Element, specialName: SpecialDefinition, support: AnySupport, counts: TagCounts): void;
