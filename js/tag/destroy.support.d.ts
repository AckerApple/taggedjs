import { Support } from './Support.class.js';
export type DestroyOptions = {
    stagger: number;
    byParent?: boolean;
};
export declare function getChildTagsToDestroy(childTags: Support[], allTags?: Support[]): Support[];
