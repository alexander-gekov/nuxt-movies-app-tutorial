import assert from "assert";
import fs from "fs";
import { ApiResponse } from "~~/types/ApiResponse";
import { createMockMovies } from "./populate";

// document based database
export type Schema = {
    movies: Movie[]
}

export type Movie = {
    id: number;
    title: string;
    genres: Genre[];
    release_date: string;
    runtime: number | null;
    overview: string;
    poster_path: string;
    adult: boolean;
}

export type Genre = {
    id: number;
    name: string;
}

/**
 * A simple pagination function
 */
function paginate<T>(array: T[], page: number, pageSize: number): { results: T[], page: number, total_pages: number, total_results: number } {
    return {
        results: array.slice((page - 1) * pageSize, page * pageSize),
        page,
        total_pages: Math.ceil(array.length / pageSize),
        total_results: array.length
    }
}

export class Database {
    public data: Schema | null;
    constructor() {
        let data = null;
        // Create the database file if it doesn't exist
        if (!fs.existsSync("database.json")) {
            console.log("Database does not exist");
        } else {
            data = JSON.parse(fs.readFileSync("database.json", "utf-8")) as Schema;
        }

        this.data = data;
    }

    async generateMockData(overwrite: boolean = false) {
        if (overwrite || this.data === null) {
            const data = await createMockMovies();
            fs.writeFileSync("database.json", JSON.stringify(data, null, 2));
            this.data = data;
        }
    }

    getMovies(page: number, pageSize: number, filter: (movie: Movie) => boolean): ApiResponse {
        assert(this.data !== null);
        return paginate(this.data.movies.filter(filter), page, pageSize);
    }

    getMovie(id: number): Movie | null {
        assert(this.data !== null);
        return this.data.movies.find(movie => movie.id === id) ?? null;
    }
}
