import type { GroupedPageMap, UngroupedPage } from "../../kitbook-types";
export declare function groupColocatedPages(ungrouped: UngroupedPage[], extensions?: {
    svx: string[];
    variants: string;
}): GroupedPageMap;
