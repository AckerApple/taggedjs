import { Tag } from './Tag.class';
import { ValueSubject } from '../subject/ValueSubject';
import { TagChildrenInput } from './tag.utils';
export declare function kidsToTagArraySubject(children?: TagChildrenInput): {
    childSubject: ValueSubject<Tag[]>;
    madeSubject: boolean;
};
