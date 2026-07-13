import { prisma } from "../lib/prisma";
import artistRepository from "../repositories/artistRepository";

async function create(artistData) {
    artistData.age = Number(artistData.age);

    return artistRepository.create(artistData);
}

async function getAll(filter = {}) {

    return artistRepository.getAll(filter);
}

const artistService = {
    create,
    getAll,
}

export default artistService;