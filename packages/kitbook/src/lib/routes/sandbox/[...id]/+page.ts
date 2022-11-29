import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
    const data = await parent();
    console.log({ id: params.id })

    return { id: params.id };
};