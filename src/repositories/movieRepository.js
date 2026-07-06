import fs from 'fs/promises';

export async function getAllMovies() {

    const content = await fs.readFile('./src/db.json', 'utf-8');
    const db = JSON.parse(content);

    return db.movies;
}