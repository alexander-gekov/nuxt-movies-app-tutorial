import { Movie } from "./Movie";

export type ApiResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}