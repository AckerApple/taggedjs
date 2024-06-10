import { BaseSupport, Support } from './tag/Support.class.js';
import { State } from './state/index.js';
import { Props } from './Props.js';
export declare function castProps(props: Props, newSupport: BaseSupport | Support, stateArray: State): any[];
export declare function alterProp(prop: unknown, ownerSupport: BaseSupport | Support, stateArray: State, newSupport: BaseSupport | Support): any;
export declare function checkProp(value: any, ownerSupport: BaseSupport | Support, stateArray: State, newSupport: BaseSupport | Support, index?: string | number, newProp?: any, seen?: any[]): any;
export declare function getPropWrap(value: any, ownerSupport: BaseSupport | Support, stateArray: State, newSupport: BaseSupport | Support, name?: string | number, newProp?: any): any;
/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export declare function callbackPropOwner(toCall: Function, callWith: any, ownerSupport: BaseSupport | Support): any;
