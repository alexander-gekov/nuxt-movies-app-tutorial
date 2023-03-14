import type { Ref } from "vue";

export function usePosterPath(getPosterPathFn: () => string | undefined): Ref<string> {
    const config = useRuntimeConfig();
    return computed(() => {
        const posterPath = getPosterPathFn();
        if (posterPath !== undefined) {
            if (posterPath.startsWith('http')) {
                return posterPath;
            }
            return `${config.public.imgBaseUrl}/${posterPath}`;
        }
        return 'https://via.placeholder.com/300x500';
    })
}
