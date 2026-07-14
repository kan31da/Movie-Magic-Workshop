import { prisma } from "../lib/prisma";

async function register(userData) {

    const user = await prisma.user.create({
        data: {
            email: userData.email,
            password: userData.password
        },
    });

    return user;
}

const authRepository = {
    register,
}

export default authRepository;