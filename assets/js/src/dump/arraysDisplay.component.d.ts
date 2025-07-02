import { FormatChange } from "./index";
import { EverySimpleValue } from "./dump.props";
export declare const arraysDisplay: import("taggedjs").TaggedFunction<({ showLevels, showAll, showKids, array, arrayView, formatChange, allowMaximize, everySimpleValue, }: {
    formatChange: FormatChange;
    array: any[];
    arrayView: string;
    showLevels: number;
    showAll?: boolean;
    showKids: boolean;
    allowMaximize?: boolean;
    everySimpleValue?: EverySimpleValue;
}) => import("taggedjs").Tag>;
export declare function getAllKeys(array: any[]): string[];
