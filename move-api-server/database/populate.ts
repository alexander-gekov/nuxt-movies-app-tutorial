import { Schema, Genre, Movie } from ".";
import * as constants from "./constants";

function chooseRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Choose n random elements without duplicates
 */
function chooseRandomN<T>(array: T[], n: number): T[] {
    const result: T[] = [];
    const copy = [...array];
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * copy.length);
        result.push(copy[randomIndex]);
        copy.splice(randomIndex, 1);
    }
    return result;
}

function randomMovieNameGenerator() {
    // Create a random movie name using adjectives, nouns and numbers
    const { adjectives, nouns } = constants;
    const [adjective1, adjective2] = chooseRandomN(adjectives, 2);
    const noun = chooseRandom(nouns);

    const words: string[] = [];

    if (Math.random() > 0.7) {
        words.push('The');
    }

    if (Math.random() > 0.7) {
        words.push(String(Math.floor(Math.random() * 10)));
    }

    words.push(adjective1);

    if (Math.random() > 0.7) {
        // create another adjective
        words.push(adjective2);
    }

    words.push(noun);

    return words.join(' ');
}

export async function createMockMovies(options: { count?: number } = {}): Promise<Schema> {
    const genreList: Genre[] = [
        { id: 1, name: "Action" },
        { id: 2, name: "Adventure" },
        { id: 3, name: "Animation" },
        { id: 4, name: "Comedy" },
        { id: 5, name: "Crime" },
        { id: 6, name: "Documentary" },
        { id: 7, name: "Drama" },
        { id: 8, name: "Family" },
        { id: 9, name: "Fantasy" },
        { id: 10, name: "History" },
    ];

    const opts = {
        count: 10_000,
        ...options,
    };

    const originTime = new Date(1900, 0, 1).getTime();

    // create 1000 different movies
    const movies: Movie[] = Array.from({ length: opts.count }, (_, i) => {
        const title = randomMovieNameGenerator();
        const genres = [chooseRandom(genreList), chooseRandom(genreList)];
        const release_date = new Date(
            originTime + Math.random() * (new Date().getTime() - originTime)
        ).toISOString();
        const runtime = Math.floor(Math.random() * 200);
        const overview = constants.loremIpsum;
        const adult = Math.random() > 0.7;

        // Random poster path
        // TODO: fetch images then use the url
        const poster_path = `https://picsum.photos/200/300?random=${i}`;
        return {
            id: i,
            title,
            genres,
            release_date,
            runtime,
            overview,
            poster_path,
            adult,
        };
    });

    return { movies };
}