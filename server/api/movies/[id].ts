import { movieFetch } from "~~/server/fetch";

export default defineEventHandler((event) => {
    // event.context.params is a Record<string, string>
    // look at the folder structure of the api folder
    // identical to event.context.params.id
    const id = getRouterParam(event, 'id') as string;

    const config = useRuntimeConfig();
    return movieFetch(`${config.apiBaseUrl}/movie/${id}`);
});
