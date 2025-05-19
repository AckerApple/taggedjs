import { NoDisplayValue } from './render/attributes/processAttribute.function.js';
type TextableValue = string | boolean | number | NoDisplayValue;
export declare function castTextValue(value: TextableValue): string;
export {};
