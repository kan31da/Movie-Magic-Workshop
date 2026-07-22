import bcrypt from 'bcrypt';

import authRepository from "../repositories/userRepository";
import { generateAuthToken } from '../utils/tokenUtils'

async function register(userData) {

    const hashPassword = await bcrypt.hash(userData.password, 10);//TODO TODO TODO

    const user = await authRepository.register({
        ...userData,
        password: hashPassword
    });

    const token = generateAuthToken(user);

    return token;
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

    const token = generateAuthToken(user);

    return token;
}

const authService = {
    register,
    login,
}

export default authService;