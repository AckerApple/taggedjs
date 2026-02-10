import { TemplaterResult } from '../../getTemplaterResult.function.js';
import { AnySupport, TagJsComponent } from '../../index.js';
import { ContextItem } from '../../ContextItem.type.js';
export declare function processTagArray(contextItem: ContextItem, value: (TemplaterResult | TagJsComponent<any>)[], // arry of Tag classes
ownerSupport: AnySupport, appendTo?: Element): void;
export declare function castArrayItem(item: any): any;
