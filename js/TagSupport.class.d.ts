import { Props } from './Props';
import { Tag, TagMemory } from './Tag.class';
import { TagChildren } from './tag';
import { TemplaterResult } from './templater.utils';
export declare class TagSupport {
    templater: TemplaterResult;
    children: TagChildren;
    propsConfig: {
        latest: Props;
        latestCloned: Props;
        lastClonedKidValues: unknown[][];
        clonedProps: Props;
    };
    memory: TagMemory;
    updateState(): void;
    constructor(templater: TemplaterResult, children: TagChildren, // children tags passed in as arguments
    props?: Props);
    oldest?: Tag;
    newest?: Tag;
    mutatingRender(): Tag;
    render(): Tag;
}
