import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { prisma } from "../lib/prisma";
import authRepository from "../repositories/userRepository";

async function register(userData) {

    const hashPassword = await bcrypt.hash(userData.password, 10);

    return await authRepository.register({
        ...userData,
        password: hashPassword
    });
}

async function login(userData) {

    const user = await authRepository.findByEmail(userData.email);

    if (!user) {
        throw new Error('No user found!');
    }

    const isPasswordValid = bcrypt.compare(userData.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid Password');
    }

    const payload = { userId: user.id, email: user.email };
    const secret = 'mySecretSecret';

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return token;
}

const authService = {
    register,
    login,
}

export default authService;