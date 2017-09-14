import {post} from '../post';

export function login(email, password) {
    const result = post('/api/user/login', {
        email,
        password
    });
    return result
};

export function register(email, password) {
    const result = post('/api/user/register', {
        email,
        password
    });

    return result;
}
