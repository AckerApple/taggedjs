import { TagSupport } from "./getTagSupport.js";
import { Provider } from "./providers.js";
import { Subscription } from "./Subject.js";
import { Counts } from "./interpolateTemplate.js";
export declare const variablePrefix = "__tagVar";
export declare const escapeVariable: string;
export declare const escapeSearch: RegExp;
export type Context = {
    [index: string]: any;
};
export declare class Tag {
    strings: string[];
    values: any[];
    isTag: boolean;
    context: Context;
    clones: (Element | Text | ChildNode)[];
    cloneSubs: Subscription[];
    children: Tag[];
    tagSupport: TagSupport;
    ownerTag?: Tag;
    insertBefore?: Element;
    appElement?: Element;
    arrayValue?: any[];
    constructor(strings: string[], values: any[]);
    providers: Provider[];
    beforeRedraw(): void;
    afterRender(): void;
    /** Used for array, such as array.map(), calls aka array.map(x => html``.key(x)) */
    key(arrayValue: any[]): this;
    destroy(options?: DestroyOptions): number;
    destroySubscriptions(): void;
    destroyClones({ stagger, rebuilding }?: DestroyOptions): number;
    updateByTag(tag: Tag): void;
    lastTemplateString: string | undefined;
    /** A method of passing down the same render method */
    setSupport(tagSupport: TagSupport): void;
    updateConfig(strings: string[], values: any[]): void;
    getTemplate(): {
        string: string;
        strings: string[];
        values: any[];
        context: Context;
    };
    isLikeTag(tag: Tag): boolean;
    update(): Context;
    updateValues(values: any[]): Context;
    updateContext(context: Context): Context;
    getAppElement(): Tag;
    /** Used during HMR only where static content itself could have been edited */
    rebuild(): void;
    buildBeforeElement(insertBefore: Element, counts?: Counts): (ChildNode | Element)[];
}
type DestroyOptions = {
    stagger: number;
    byParent?: boolean;
    rebuilding?: boolean;
};
export {};
