import { InsertBefore } from './interpolations/Clones.type';
import { Context, ElementBuildOptions } from './Tag.class';
import { TagSupport } from './tag/TagSupport.class';
export declare function afterInterpolateElement(container: Element, insertBefore: InsertBefore, tagSupport: TagSupport, context: Context, options: ElementBuildOptions): ChildNode[];
