import { BaseSupport } from './Support.class.js';
import { TemplaterResult } from './TemplaterResult.class.js';
export declare function hasSupportChanged(lastSupport: BaseSupport, newSupport: BaseSupport, newTemplater: TemplaterResult): number | false;
export declare function hasKidsChanged(oldSupport: BaseSupport, newSupport: BaseSupport): number | false;
