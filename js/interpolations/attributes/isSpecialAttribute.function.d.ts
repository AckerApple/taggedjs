/** @deprecated - this needs to be replaced with the source attribute defining itself so select.value`1` just sets itself properly
 * Looking for (class | style) followed by a period
*/
export declare function isSpecialAttr(attrName: string, tagName: string): false | "class" | "style" | "autofocus" | "autoselect" | "value";
export declare function isSpecialAction(attrName: string): false | "autofocus" | "autoselect";
