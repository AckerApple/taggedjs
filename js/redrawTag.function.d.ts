import { TagSupport } from './TagSupport.class';
import { TemplaterResult } from './templater.utils';
import { Tag } from './Tag.class';
export declare function redrawTag(tagSupport: TagSupport, templater: TemplaterResult, // latest tag function to call for rendering
existingTag?: Tag, ownerTag?: Tag): {
    remit: boolean;
    retag: Tag;
};
