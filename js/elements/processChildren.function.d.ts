import { AnySupport } from '../index.js';
import { painter } from '../render/paint.function.js';
import { ContextItem } from '../tag/index.js';
export declare function processChildren(innerHTML: any[], parentContext: ContextItem, ownerSupport: AnySupport, element: HTMLElement | Text, // appendTo
paintBy: painter): void;
/** used when a child is not another element and requires init processing */
export declare function processNonElement(item: any, parentContext: ContextItem, element: HTMLElement | Text, ownerSupport: AnySupport, paintBy: painter): ContextItem;
export declare function handleSimpleInnerValue(value: number | string, element: HTMLElement | Text, paintBy: painter): Text;
