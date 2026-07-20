import jwt from 'jsonwebtoken'

export function generateAuthToken(user) {
    const payload = { userId: user.id, email: user.email };

    const token = jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: '1h' });

    return token;
}