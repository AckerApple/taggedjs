import { Props } from '../Props.js';
import { Context, ElementBuildOptions, TagTemplate } from './Tag.class.js';
import { State } from '../state/index.js';
import { TemplaterResult } from './TemplaterResult.class.js';
import { TagSubject } from '../subject.types.js';
import { DestroyOptions } from './destroy.support.js';
/** used only for apps, otherwise use Support */
export declare class BaseSupport {
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
        castProps?: Props;
    };
    state: State;
    hasLiveElements: boolean;
    constructor(templater: TemplaterResult, subject: TagSubject, castedProps?: Props);
    clonePropsBy(props: Props, castedProps?: Props): {
        latest: Props;
        latestCloned: any[];
        castProps: Props | undefined;
        lastClonedKidValues: any[][];
    };
    /** Function that kicks off actually putting tags down as HTML elements */
    buildBeforeElement(fragment?: DocumentFragment, options?: ElementBuildOptions): DocumentFragment;
    getTemplate(): TagTemplate;
    update(): Context;
    updateContext(context: Context): Context;
    updateBy(support: BaseSupport | Support): void;
    updateConfig(strings: string[], values: any[]): void;
    updateValues(values: any[]): Context;
    destroy(options?: DestroyOptions): number | Promise<number>;
    destroyClones({ stagger }?: DestroyOptions): {
        promise: Promise<(void | undefined)[]>;
        stagger: number;
    } | {
        stagger: number;
        promise?: undefined;
    };
    /** Reviews elements for the presences of ondestroy */
    checkCloneRemoval(clone: Element | Text | ChildNode, stagger: number): Promise<void> | undefined;
    destroySubscriptions(): void;
}
export declare class Support extends BaseSupport {
    templater: TemplaterResult;
    ownerSupport: Support;
    subject: TagSubject;
    version: number;
    isApp: boolean;
    constructor(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
    ownerSupport: Support, subject: TagSubject, castedProps?: Props, version?: number);
    getAppSupport(): Support;
}
export declare function resetSupport(support: BaseSupport | Support): void;
