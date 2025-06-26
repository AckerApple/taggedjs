/** Looking for (class | style) followed by a period */
export declare function isSpecialAttr(attrName: string): false | "init" | "destroy" | "class" | "style" | "autofocus" | "autoselect";
export declare function isSpecialAction(attrName: string): false | "init" | "destroy" | "autofocus" | "autoselect";
