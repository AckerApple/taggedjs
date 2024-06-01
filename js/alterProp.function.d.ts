import { TagSupport } from './tag/TagSupport.class.js';
import { State } from './state/index.js';
export declare function alterProp(prop: unknown, ownerSupport: TagSupport, stateArray: State, newTagSupport: TagSupport): any;
/** Function shared by alterProps() and updateExistingTagComponent... TODO: May want to have to functions to reduce cycle checking?  */
export declare function callbackPropOwner(toCall: Function, callWith: any, ownerSupport: TagSupport, // <-- WHEN called from alterProp its owner OTHERWISE its previous
stateArray: State): any;
