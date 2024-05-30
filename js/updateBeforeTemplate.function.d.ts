import { InsertBefore } from './interpolations/Clones.type.js';
import { NoDisplayValue } from './interpolations/processAttribute.function.js';
export declare function updateBeforeTemplate(value: string, // value should be casted before calling here
lastFirstChild: InsertBefore): Text;
type TextableValue = string | boolean | number | NoDisplayValue;
export declare function castTextValue(value: TextableValue): string;
export {};
