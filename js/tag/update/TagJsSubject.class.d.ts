import { TagGlobal } from '../TemplaterResult.class.js';
import { ValueSubject } from '../../subject/ValueSubject.js';
import { ValueTypes } from '../ValueTypes.enum.js';
import { TagTemplate } from '../Tag.class.js';
export declare class TagJsSubject<T> extends ValueSubject<T> {
    tagJsType: ValueTypes;
    global: TagGlobal;
    lastRun?: TagTemplate;
}
export declare function getNewGlobal(): TagGlobal;
