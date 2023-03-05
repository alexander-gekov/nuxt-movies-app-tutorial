export type Movie = {
    id: number;
    title: string;
    genres: Array<{
        id: number;
        name: string
    }>;
    release_date: string;
    runtime: number | null;
    overview: string;
    poster_path: string;
}
