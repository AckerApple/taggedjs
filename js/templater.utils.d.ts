import { Context, Tag } from './Tag.class';
import { BaseTagSupport } from './TagSupport.class';
import { Props } from './Props';
import { TagChildren } from './tag';
import { Provider } from './providers';
import { OnDestroyCallback } from './onDestroy';
export type Wrapper = ((tagSupport: BaseTagSupport) => Tag) & {
    original: () => Tag;
};
export declare class TemplaterResult {
    props: Props;
    children: TagChildren;
    tagged: boolean;
    wrapper: Wrapper;
    global: {
        oldest?: Tag;
        newest?: Tag;
        context: Context;
        providers: Provider[];
        /** Indicator of re-rending. Saves from double rending something already rendered */
        renderCount: number;
        destroyCallback?: OnDestroyCallback;
        insertBefore?: Element | Text;
    };
    tagSupport: BaseTagSupport;
    constructor(props: Props, children: TagChildren);
    redraw?: (force?: boolean) => Tag;
    isTemplater: boolean;
    renderWithSupport(tagSupport: BaseTagSupport, existingTag: Tag | undefined, ownerTag?: Tag): {
        remit: boolean;
        retag: Tag;
    };
}
export interface TemplateRedraw extends TemplaterResult {
    redraw: () => Tag;
}
export declare function alterProps(props: Props, templater: TemplaterResult): any;
