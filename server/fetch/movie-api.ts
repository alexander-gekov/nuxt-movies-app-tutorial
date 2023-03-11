const config = useRuntimeConfig();

export const movieFetch = $fetch.create({
    baseURL: config.apiBaseUrl,
    headers: (() => {
        if (config.apiKey) {
            return {
                "Authorization": `Bearer ${config.apiKey}`
            }
        }
        console.log("No API key provided. Headers will be empty.");
        return {} as Record<string, string>;
    })()
});
