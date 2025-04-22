import { TagTemplate } from './getDomTag.function.js';
import { StringTag } from './StringTag.type.js';
import { DomTag } from './DomTag.type.js';
import { TemplaterResult } from './getTemplaterResult.function.js';
import { ValueSubject } from '../subject/ValueSubject.js';
import { setUseMemory } from '../state/index.js';
import { ValueTypes } from './ValueTypes.enum.js';
export type TagChildren = ValueSubject<(StringTag | DomTag)[]> & {
    lastArray?: (StringTag | DomTag)[];
};
export type TagChildrenInput = (StringTag | DomTag)[] | DomTag | StringTag | TagChildren;
export type TagComponent = ((...args: unknown[]) => (StringTag | DomTag)) & {
    tags?: TagWrapper<unknown>[];
    tagIndex?: number;
    setUse?: typeof setUseMemory;
    ValueTypes: typeof ValueTypes;
};
export declare const tags: TagWrapper<unknown>[];
export type Original = ((...args: unknown[]) => unknown) & {
    setUse: unknown[];
    tags?: TagWrapper<unknown>[];
};
export type TagWrapper<T> = ((...props: T[]) => TemplaterResult) & {
    original: Original;
    tagJsType?: typeof ValueTypes.renderOnce | typeof ValueTypes.stateRender;
    lastRuns?: {
        [index: number]: TagTemplate;
    };
};
