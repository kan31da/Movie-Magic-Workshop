import jwt from 'jsonwebtoken'

export function generateAuthToken(user) {
    const payload = { userId: user.id, email: user.email };
    const secret = 'mySecretSecret';

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return token;
}