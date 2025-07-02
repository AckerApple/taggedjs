import { FormatChange } from "./index.js";
import { EverySimpleValue } from "./dump.props";
export declare const dumpArray: import("taggedjs").TaggedFunction<({ key, value, show, showAll, showKids, showLevels, formatChange, allowMaximize, everySimpleValue, }: {
    value: any;
    showLevels: number;
    key?: string;
    show: boolean;
    showAll?: boolean;
    showKids: boolean;
    formatChange: FormatChange;
    allowMaximize?: boolean;
    everySimpleValue?: EverySimpleValue;
}) => import("taggedjs").Tag>;
