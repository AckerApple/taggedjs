import { AnySupport } from '../tag/index.js';
import { Props } from '../Props.js';
import { TemplaterResult } from '../tag/getTemplaterResult.function.js';
export declare function checkRenderUp(templater: TemplaterResult, support: AnySupport): boolean;
export declare function hasPropLengthsChanged(nowProps: Props, latestProps: Props): boolean;
