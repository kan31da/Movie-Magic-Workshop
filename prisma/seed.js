import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    // Seed Users
    const user1 = await prisma.user.create({
        data: {
            email: "user1@example.com",
            password: "password123", // In a real app, hash passwords!
        },
    });

    const user2 = await prisma.user.create({
        data: {
            email: "user2@example.com",
            password: "password456",
        },
    });

    const user3 = await prisma.user.create({
        data: {
            email: "john.doe@example.com",
            password: "password123",
        },
    });

    const user4 = await prisma.user.create({
        data: {
            email: "jane.smith@example.com",
            password: "password456",
        },
    });

    // Seed Artists
    const artist1 = await prisma.artist.create({
        data: {
            name: "Jet Lee",
            age: 30,
            born: "1993-01-01",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSbnS8YjtWmM5fDSJzj-OIeNxDftdbL9ZqYMQK070P8A&s=10",
        },
    });

    const artist2 = await prisma.artist.create({
        data: {
            name: "Agam Schuster",
            age: 40,
            born: "1983-05-15",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgZf4QhwKOdGwmGlL65g3gg1oN2WNcww-bszA-1NR_fw&s=10",
        },
    });

    const artist3 = await prisma.artist.create({
        data: {
            name: "Leonardo DiCaprio",
            age: 48,
            born: "1974-11-11",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-eaFvTh4vBgagXdOcPGaJqNDGaMub70sgI7bmlbg8mw&s=10",
        },
    });

    const artist4 = await prisma.artist.create({
        data: {
            name: "Scarlett Johansson",
            age: 39,
            born: "1984-11-22",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTrKubdbhDGAuuZubiTvyMJq21qVp7p7VZFBXWbyXKQ&s=10",
        },
    });

    // Seed Movies
    await prisma.movie.createMany({
        data: [
            {
                title: "Movie One",
                category: "Action",
                genre: "Thriller",
                director: "Director One",
                year: 2020,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF0EZ5oR6EmNWeGTv9zROhLFuVyesO6H-XuJdweBAacg&s=10",
                rating: 4.5,
                description: "An exciting action movie.",
                userId: user1.id,
                artistId: artist1.id,
            },
            {
                title: "Movie Two",
                category: "Drama",
                genre: "Romance",
                director: "Director Two",
                year: 2018,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbGCTjcMbCRD_Ky2qPty45TaBJGoCKpMTsebPB1iEOAQ&s=10",
                rating: 4.0,
                description: "A touching romantic drama.",
                userId: user2.id,
                artistId: artist2.id,
            },
            {
                title: "Inception",
                category: "Action",
                genre: "Sci-Fi",
                director: "Christopher Nolan",
                year: 2010,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbY-KG6to1c6TnWtwLvFbPva_pqcffh7UlWiOCjmUFuA&s=10",
                rating: 4.8,
                description: "A mind-bending thriller about dreams.",
                userId: user1.id,
                artistId: artist1.id,
            },
            {
                title: "Lost in Translation",
                category: "Drama",
                genre: "Romance",
                director: "Sofia Coppola",
                year: 2003,
                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuN2CT6Le2iqVjl9HHR1HNlOLvytc7CYM5oFrn8MpLzg&s=10",
                rating: 4.2,
                description: "A story about loneliness and connection.",
                userId: user2.id,
                artistId: artist2.id,
            },
        ],
    });
}
main()
    .then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect(); process.exit(1);
    });
