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

async function findByEmail(email) {
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    return user;
}

const authRepository = {
    register,
    findByEmail,
}

export default authRepository;