import { Tag } from "taggedjs";
import { OnHeaderClick } from "./index";
import { EverySimpleValue } from "./dump.props";
export declare function dumpSimple({ key, value, onHeaderClick, everySimpleValue }: {
    key: string | undefined;
    value: any;
    onHeaderClick?: OnHeaderClick;
    everySimpleValue?: EverySimpleValue;
}): Tag;
