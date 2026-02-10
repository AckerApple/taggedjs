import { ContextItem } from '../index.js';
import { Provider } from '../state/providers.js';
import { AppContextItem } from './ContextItem.type.js';
import { ContextStateMeta } from './ContextStateMeta.type.js';
import { SupportTagGlobal } from './getTemplaterResult.function.js';
export interface AppSupportContextItem extends AppContextItem {
    global: SupportTagGlobal;
    state: ContextStateMeta;
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: number;
    varCounter: number;
}
export interface SupportContextItem extends ContextItem {
    providers?: Provider[];
    varCounter: number;
    contexts: SupportContextItem[];
    global: SupportTagGlobal;
    state: ContextStateMeta;
    /** Indicator of re-rending. Saves from double rending something already rendered */
    renderCount: number;
}
