import { AnySupport } from "../../tag/AnySupport.type.js";
import { Counts } from "../interpolateTemplate.js";
import { SpecialDefinition } from "../../render/attributes/processAttribute.function.js";
/** handles init, destroy, autofocus, autoselect, style., class. */
export declare function specialAttribute(name: string, value: any, element: Element, specialName: SpecialDefinition, support: AnySupport, counts: Counts): void;
