import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';
// import { alertService } from './alert.service';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
};

async function login(username, password) {
    const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });
    userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
}

function logout() {
    // alertService.clear();
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

