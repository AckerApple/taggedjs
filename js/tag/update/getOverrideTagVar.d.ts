import { SupportContextItem, AnySupport } from '../../index.js';
import { ReadOnlyVar } from '../../TagJsTags/TagJsTag.type.js';
import { ContextItem } from '../ContextItem.type.js';
/** Used when a tag() does not return html`` */
export declare function getOverrideTagVar(context: ContextItem & SupportContextItem, newContext: ContextItem, support: AnySupport, subject: SupportContextItem): ReadOnlyVar;
