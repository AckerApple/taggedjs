import { Tag } from './Tag.class';
import { TagSupport } from './TagSupport.class';
import { Config } from './set.function';
interface TagUse {
    beforeRender: (tagSupport: TagSupport, ownerTag: Tag) => void;
    beforeRedraw: (tagSupport: TagSupport, tag: Tag) => void;
    afterRender: (tagSupport: TagSupport, tag: Tag) => void;
    beforeDestroy: (tagSupport: TagSupport, tag: Tag) => void;
}
export type UseOptions = {
    beforeRender?: (tagSupport: TagSupport, ownerTag: Tag) => void;
    beforeRedraw?: (tagSupport: TagSupport, tag: Tag) => void;
    afterRender?: (tagSupport: TagSupport, tag: Tag) => void;
    beforeDestroy?: (tagSupport: TagSupport, tag: Tag) => void;
};
export declare function setUse(use: UseOptions): void;
export declare namespace setUse {
    var tagUse: TagUse[];
    var memory: Record<string, any> & {
        stateConfig: Config;
    };
}
export {};
