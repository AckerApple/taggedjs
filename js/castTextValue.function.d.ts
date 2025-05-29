import { NoDisplayValue } from './render/attributes/NoDisplayValue.type.js';
type TextableValue = string | boolean | number | NoDisplayValue;
export declare function castTextValue(value: TextableValue): string;
export {};
