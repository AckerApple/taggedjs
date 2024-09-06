import { AnySupport, BaseSupport, Support } from './tag/Support.class.js';
import { Props } from './Props.js';
export declare function castProps(props: Props, newSupport: BaseSupport | Support, depth: number): any[];
export declare function alterProp(prop: unknown, ownerSupport: BaseSupport | Support, newSupport: BaseSupport | Support, depth: number): any;
export declare function checkProp(value: any, ownerSupport: BaseSupport | Support, newSupport: BaseSupport | Support, depth: number): any;
export declare function getPropWrap(value: any, ownerSupport: BaseSupport | Support): any;
/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export declare function callbackPropOwner(toCall: Function, callWith: any, ownerSupport: BaseSupport | Support): any;
export declare function isSkipPropValue(value: unknown): true | import("./tag/ValueTypes.enum.js").ValueType | undefined;
export declare function safeRenderSupport(newest: AnySupport, ownerSupport: AnySupport): AnySupport | undefined;
