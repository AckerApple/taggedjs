import { Props } from '../Props.js';
import { AnySupport } from './index.js';
import { TemplaterResult } from './getTemplaterResult.function.js';
/** Used when deciding if a support will even change (are the arguments the same?) */
export declare function hasSupportChanged(oldSupport: AnySupport, newTemplater: TemplaterResult): number | string | false;
export declare function immutablePropMatch(props: Props, pastCloneProps: Props): false | 2;
export declare const shallowCompareDepth = 3;
export declare const deepCompareDepth = 10;
