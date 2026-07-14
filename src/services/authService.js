import { prisma } from "../lib/prisma";
import authRepository from "../repositories/userRepository";

async function register(userData) {

    return await authRepository.register(userData);
}

const authService = {
    register,
}

export default authService;