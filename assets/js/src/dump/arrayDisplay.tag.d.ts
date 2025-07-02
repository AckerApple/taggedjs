import { FormatChange } from "./index";
import { EverySimpleValue } from "./dump.props";
export declare const arrayDisplay: import("taggedjs").TaggedFunction<({ array, showLevels, showAll, showKids, columnNames, formatChange, toggleColumnDialog, allowMaximize, everySimpleValue, }: {
    array: any[];
    showLevels: number;
    showAll?: boolean;
    showKids: boolean;
    columnNames?: string[];
    formatChange: FormatChange;
    toggleColumnDialog: () => any;
    allowMaximize?: boolean;
    everySimpleValue?: EverySimpleValue;
}) => import("taggedjs").Tag>;
