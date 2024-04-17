import { Tag } from './Tag.class';
import { BaseTagSupport } from './TagSupport.class';
import { Subject } from './subject';
export declare const tagClosed$: Subject<Tag>;
export declare function runBeforeRender(tagSupport: BaseTagSupport, tagOwner: Tag): void;
export declare function runAfterRender(tagSupport: BaseTagSupport, tag: Tag): void;
export declare function runBeforeRedraw(tagSupport: BaseTagSupport, tag: Tag): void;
export declare function runBeforeDestroy(tagSupport: BaseTagSupport, tag: Tag): void;
