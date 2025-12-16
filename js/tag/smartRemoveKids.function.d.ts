import { ContextItem } from './ContextItem.type.js';
import { SupportContextItem } from './index.js';
/** sets global.deleted on support and all children */
export declare function smartRemoveKids(context: SupportContextItem, allPromises: Promise<any>[]): void;
export declare function destroyContextHtml(context: ContextItem): void;
