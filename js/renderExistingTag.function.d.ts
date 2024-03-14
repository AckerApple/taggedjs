import { Tag } from './Tag.class';
import { TagSupport } from './TagSupport.class';
import { TemplaterResult } from './templater.utils';
/** Returns true when rendering owner is not needed. Returns false when rendering owner should occur */
export declare function renderExistingTag(tag: Tag, newTemplater: TemplaterResult, tagSupport: TagSupport): boolean;
