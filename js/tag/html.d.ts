import { RegularValue } from './update/processRegularValue.function.js';
import { InputElementTargetEvent } from '../TagJsEvent.type.js';
export type InputCallback = ((e: InputElementTargetEvent) => unknown);
/** represents a single value within html`<div>${value}</div>`. The data typing of "& unknown" is to allow anything AND STILL infer functions have one argument if "e"  */
export type TagValue = (InputCallback | RegularValue | object | void) & unknown;
export type TagValues = TagValue[];
