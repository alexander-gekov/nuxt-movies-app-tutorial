import express from "express";
import { Database } from "./database";

export async function createServer() {
    // use the mock database
    const db = new Database();
    await db.generateMockData();

    // create an express server
    const app = express();
    
    app.get('/', (req, res) => {
        res.send('online');
    });
    
    app.get('/movie/:id', (req, res) => {
        const movie = db.getMovie(parseInt(req.params.id));
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).send('Not found');
        }
    });

    app.get('/search/movie', (req, res) => {
        const rq = req.query as {
            page?: string;
            page_size?: string;
            query?: string;
            include_adult?: string;
        }

        // The following code is not industry practice
        // You should use a validation library like Zod, Joi, or shapeshift
        // When the validation fails, it will be harder for the developer to know the issue
        const page = parseInt(rq.page ?? '1');
        const pageSize = parseInt(rq.page_size ?? '20');
        const query = rq.query?.toLowerCase() ?? '';
        const includeAdult = rq.include_adult === 'true';

        const results = db.getMovies(page, pageSize, movie => movie.title.toLowerCase().includes(query) && (!movie.adult || includeAdult));
        
        res.json(results);
    });

    return app;
}