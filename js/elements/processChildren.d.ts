import { AnySupport } from '..';
import { ContextItem } from '../tag';
export declare function processChildren(innerHTML: any[], context: ContextItem, ownerSupport: AnySupport, addedContexts: ContextItem[], element: HTMLElement): void;
export declare function processNonElement(item: any, context: ContextItem, addedContexts: ContextItem[], element: HTMLElement, ownerSupport: AnySupport): ContextItem;
export declare function handleSimpleInnerValue(value: number | string, element: HTMLElement): Text;
