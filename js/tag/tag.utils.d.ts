import { Dom, Tag, TagTemplate } from './Tag.class.js';
import { TemplaterResult } from './TemplaterResult.class.js';
import { ValueSubject } from '../subject/ValueSubject.js';
import { setUse } from '../state/index.js';
export type TagChildren = ValueSubject<(Tag | Dom)[]> & {
    lastArray?: (Tag | Dom)[];
};
export type TagChildrenInput = (Tag | Dom)[] | Dom | Tag | TagChildren;
export type TagComponent = ((...args: any[]) => (Tag | Dom)) & {
    tags?: TagWrapper<any>[];
    setUse?: typeof setUse;
    tagIndex?: number;
};
export declare const tags: TagWrapper<any>[];
export type TagWrapper<T> = ((...props: T[]) => TemplaterResult) & {
    original: ((...args: any[]) => any);
    compareTo: string;
    isTag: boolean;
    oneRender?: true;
    lastRuns?: {
        [index: number]: TagTemplate;
    };
};
export type TagMaker = ((...args: any[]) => (Tag | Dom)) | ((...args: any[]) => (...args: any[]) => (Tag | Dom));
