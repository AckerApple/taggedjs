import { Props } from '../Props.js';
import { Context, Tag, Dom } from './Tag.class.js';
import { State } from '../state/index.js';
import { TemplaterResult } from './TemplaterResult.class.js';
import { TagSubject } from '../subject.types.js';
import { DestroyOptions } from './destroy.support.js';
import { DomObjectChildren, ObjectChildren } from '../interpolations/optimizers/ObjectNode.types.js';
import { ElementBuildOptions } from '../interpolations/interpolateTemplate.js';
export type AnySupport = BaseSupport | Support;
/** used only for apps, otherwise use Support */
export declare class BaseSupport {
    templater: TemplaterResult;
    subject: TagSubject;
    isApp: boolean;
    appElement?: Element;
    strings?: string[];
    dom?: ObjectChildren;
    values?: unknown[];
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
        lastClonedKidValues: unknown[][];
    };
    getHtmlDomMeta(fragment: DocumentFragment, options?: ElementBuildOptions): DomObjectChildren;
    /** Function that kicks off actually putting tags down as HTML elements */
    buildBeforeElement(fragment?: DocumentFragment, options?: ElementBuildOptions): DocumentFragment;
    updateBy(support: BaseSupport | Support): void;
    /** triggers values to render */
    updateConfig(tag: Dom | Tag, values: any[]): void;
    updateValues(values: any[]): Context;
    update(): Context;
    updateContext(context: Context): Context;
    destroy(options?: DestroyOptions): number | Promise<number>;
    smartRemoveKids(options?: DestroyOptions): {
        promises: Promise<any>[];
        stagger: number;
    };
    destroyClones(options?: DestroyOptions): {
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
    ownerSupport: BaseSupport | Support;
    subject: TagSubject;
    version: number;
    isApp: boolean;
    constructor(templater: TemplaterResult, // at runtime rendering of a tag, it needs to be married to a new Support()
    ownerSupport: BaseSupport | Support, subject: TagSubject, castedProps?: Props, version?: number);
    getAppSupport(): this;
}
export declare function resetSupport(support: BaseSupport | Support): void;
