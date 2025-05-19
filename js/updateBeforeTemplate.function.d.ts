import { ContextItem } from './index.js';
import { NoDisplayValue } from './render/attributes/processAttribute.function.js';
export declare function updateBeforeTemplate(value: string, // value should be casted before calling here
lastFirstChild: Text, subject: ContextItem): void;
type TextableValue = string | boolean | number | NoDisplayValue;
export declare function castTextValue(value: TextableValue): string;
export {};
