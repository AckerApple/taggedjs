import { Tag } from './Tag.class';
import { TagSupport } from './TagSupport.class';
export declare function runBeforeRender(tagSupport: TagSupport, tagOwner: Tag): void;
export declare function runAfterRender(tagSupport: TagSupport, tag: Tag): void;
export declare function runBeforeRedraw(tagSupport: TagSupport, tag: Tag): void;
export declare function runBeforeDestroy(tagSupport: TagSupport, tag: Tag): void;
