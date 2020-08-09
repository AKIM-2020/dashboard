import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

export const authenticationService = {
    get currentUserValue() { return currentUserSubject.value },
    get currentToken() { return currentUserSubject.value
        ? currentUserSubject.value.accessToken
        : null
    }
};