import { Props } from "./Props";
import { TagSupport } from "./TagSupport.class";
export declare function hasTagSupportChanged(oldTagSupport: TagSupport, newTagSupport: TagSupport): boolean;
export declare function hasPropChanges(props: Props, // natural props
pastCloneProps: Props, // previously cloned props
compareToProps: Props): boolean;
export declare function hasKidsChanged(oldTagSupport: TagSupport, newTagSupport: TagSupport): boolean;
