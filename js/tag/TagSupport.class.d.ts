import { Props } from '../Props.js';
import { Context, ElementBuildOptions, TagMemory, TagTemplate } from './Tag.class.js';
import { TagGlobal, TemplaterResult } from './TemplaterResult.class.js';
import { TagSubject } from '../subject.types.js';
import { DestroyOptions } from './destroy.support.js';
import { InsertBefore } from '../interpolations/Clones.type.js';
/** used only for apps, otherwise use TagSupport */
export declare class BaseTagSupport {
    templater: TemplaterResult;
    subject: TagSubject;
    isApp: boolean;
    appElement?: Element;
    strings?: string[];
    values?: any[];
    propsConfig: {
        latest: Props;
        latestCloned: Props;
        lastClonedKidValues: unknown[][];
    };
    memory: TagMemory;
    clones: (Element | Text | ChildNode)[];
    global: TagGlobal;
    hasLiveElements: boolean;
    childTags: TagSupport[];
    constructor(templater: TemplaterResult, subject: TagSubject);
    /** Function that kicks off actually putting tags down as HTML elements */
    buildBeforeElement(insertBefore: InsertBefore, options?: ElementBuildOptions): void;
    getTemplate(): TagTemplate;
    update(): Context;
    updateContext(context: Context): Context;
    updateBy(tagSupport: TagSupport): void;
    updateConfig(strings: string[], values: any[]): void;
    updateValues(values: any[]): Context;
}
export declare class TagSupport extends BaseTagSupport {
    templater: TemplaterResult;
    ownerTagSupport: TagSupport;
    subject: TagSubject;
    version: number;
    isApp: boolean;
    constructor(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new TagSupport()
    ownerTagSupport: TagSupport, subject: TagSubject, version?: number);
    destroy(options?: DestroyOptions): Promise<number>;
    destroySubscriptions(): void;
    destroyClones({ stagger }?: DestroyOptions): {
        promise: Promise<(void | undefined)[]>;
        stagger: number;
    } | {
        stagger: number;
        promise?: undefined;
    };
    /** Reviews elements for the presences of ondestroy */
    checkCloneRemoval(clone: Element | Text | ChildNode, stagger: number): Promise<void> | undefined;
    getAppTagSupport(): TagSupport;
}
