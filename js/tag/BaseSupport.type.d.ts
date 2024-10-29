import { State } from '../state/index.js';
import { StatesSetter } from '../state/states.utils.js';
import { HtmlSupport, SupportContextItem } from './Support.class.js';
export type BaseSupport = HtmlSupport & {
    state: State;
    states: StatesSetter[];
    subject: SupportContextItem;
};
