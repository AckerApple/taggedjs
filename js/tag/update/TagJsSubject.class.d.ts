import { TagGlobal } from '../TemplaterResult.class.js';
import { ValueSubject } from '../../subject/ValueSubject.js';
import { ValueTypes } from '../ValueTypes.enum.js';
export declare class TagJsSubject<T> extends ValueSubject<T> {
    tagJsType: ValueTypes;
    global: TagGlobal;
}
export declare function getNewGlobal(): TagGlobal;
