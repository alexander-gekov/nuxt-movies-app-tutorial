export function getPosterPath(posterPath: string | undefined) {
    const config = useRuntimeConfig();

    if (posterPath !== undefined) {
        if (posterPath.startsWith('http')) {
            return posterPath;
        }
        return `${config.public.imgBaseUrl}/${posterPath}`;
    }
    return 'https://via.placeholder.com/300x500';
}
