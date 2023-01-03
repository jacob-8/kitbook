import type { GroupedPage, LoadedModules } from '../kitbook-types';
export declare const mainPageLoad: ({ params, parent }: {
    params: any;
    parent: any;
}) => Promise<{
    page: GroupedPage;
    loadedModules: LoadedModules;
    error?: undefined;
} | {
    error: string;
    page?: undefined;
    loadedModules?: undefined;
}>;
