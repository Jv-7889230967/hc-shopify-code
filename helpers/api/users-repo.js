import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
const { serverRuntimeConfig } = getConfig();

export const usersRepo = {
    authenticate
};

async function authenticate({ username, password }) {
    const token = jwt.sign({ sub: username }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    return {
        username,
        token
    };
}
