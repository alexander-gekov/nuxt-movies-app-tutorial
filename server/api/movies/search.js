export default defineEventHandler((event) => {
    const {query, page} = getQuery(event);
    const config = useRuntimeConfig();
    return $fetch(`${config.apiBaseUrl}/search/movie?query=${query}&page=${page}&include_adult=false`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${config.apiKey}`
        }
    })
})
