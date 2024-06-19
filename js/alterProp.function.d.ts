import { BaseSupport, Support } from './tag/Support.class.js';
import { State } from './state/index.js';
import { Props } from './Props.js';
export declare function castProps(props: Props, newSupport: BaseSupport | Support, stateArray: State, depth: number): any[];
export declare function alterProp(prop: unknown, ownerSupport: BaseSupport | Support, stateArray: State, newSupport: BaseSupport | Support, depth: number): any;
export declare function checkProp(value: any, ownerSupport: BaseSupport | Support, stateArray: State, newSupport: BaseSupport | Support, depth: number, index?: string | number, newProp?: any): any;
export declare function getPropWrap(value: any, ownerSupport: BaseSupport | Support, stateArray: State): any;
/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export declare function callbackPropOwner(toCall: Function, callWith: any, ownerSupport: BaseSupport | Support): any;
export declare function isSkipPropValue(value: unknown): boolean;
