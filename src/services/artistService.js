import { prisma } from "../lib/prisma";
import artistRepository from "../repositories/artistRepository";

export async function create(artistData) {
    artistData.age = Number(artistData.age);

    return artistRepository.create(artistData);
}

export async function getAll() {
    const artists = await prisma.artist.findMany();
    
    return artists;
}

const artistService = {
    create,
    getAll,
}

export default artistService;