import { prisma } from "../lib/prisma";

async function create(artistData) {
    const artist = await prisma.artist.create({
        data: artistData,
    });

    return artist;
}

async function getAll(filter = {}) {

    const artists = await prisma.artist.findMany({
        where: {
            id: {
                notIn: Array.isArray(filter.exclude)
                    ? filter.exclude
                    : [],
            }
        }
    });

    return artists;

}

const artistRepository = {
    create,
    getAll,
}

export default artistRepository;