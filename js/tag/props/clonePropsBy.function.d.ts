import { Props } from '../../Props.js';
import { AnySupport } from '../index.js';
export declare function clonePropsBy(support: AnySupport, props: Props, castProps?: Props): {
    latest: Props;
    castProps: Props | undefined;
} | undefined;
