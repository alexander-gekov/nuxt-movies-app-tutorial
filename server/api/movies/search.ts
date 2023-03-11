import { movieFetch } from "~~/server/fetch";

export default defineEventHandler((event) => {
    // getQuery is an h3 helper function that returns the query object
    // identical to event.context.query.query and event.context.query.page
    const { query, page } = getQuery(event);

    return movieFetch(`/search/movie?query=${query}&page=${page}&include_adult=false`);
})
