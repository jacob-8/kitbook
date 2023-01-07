import type { GroupedPage, LoadedModules } from '../kitbook-types';
export declare const mainPageLoad: ({ params, parent }: {
    params: any;
    parent: any;
}) => Promise<{
    page: GroupedPage;
    pageKey: string;
    loadedModules: LoadedModules;
    error?: undefined;
} | {
    error: string;
    page?: undefined;
    pageKey?: undefined;
    loadedModules?: undefined;
}>;
