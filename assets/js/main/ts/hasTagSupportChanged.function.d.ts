import { Props } from "./Props";
import { BaseTagSupport } from "./TagSupport.class";
import { TemplaterResult } from "./TemplaterResult.class";
export declare function hasTagSupportChanged(oldTagSupport: BaseTagSupport, newTagSupport: BaseTagSupport, newTemplater: TemplaterResult): boolean;
export declare function hasPropChanges(props: Props, // natural props
pastCloneProps: Props): boolean;
export declare function hasKidsChanged(oldTagSupport: BaseTagSupport, newTagSupport: BaseTagSupport): boolean;
