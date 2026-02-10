import { AnySupport } from '../index.js';
import { ContextItem, ElementContext } from '../tag/ContextItem.type.js';
export declare function destroyDesignElement(context: ElementContext, ownerSupport: AnySupport): Promise<void> | undefined;
export declare function afterElementDestroy(context: ElementContext): void;
export declare function destroyDesignByContexts(contexts: ContextItem[], ownerSupport: AnySupport, promises: Promise<any>[]): number | undefined;
