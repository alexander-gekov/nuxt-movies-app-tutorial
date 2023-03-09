export function usePosterPath(posterPath: string | undefined) {
    const config = useRuntimeConfig();
    return computed(() => {
        if (posterPath !== undefined) {
            if (posterPath.startsWith('http')) {
                return posterPath;
            }
            return `${config.public.imgBaseUrl}/${posterPath}`;
        }
        return 'https://via.placeholder.com/300x500';
    })
}
