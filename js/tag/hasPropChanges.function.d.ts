import { Props } from '../Props.js';
import { PropWatches } from '../tagJsVars/tag.function.js';
/**
 *
 * @param props
 * @param pastCloneProps
 * @returns WHEN number then props have changed. WHEN false props have not changed
 */
export declare function hasPropChanges(props: Props, // natural props
pastCloneProps: Props, // previously cloned props
propWatch: PropWatches): number | false;
