import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

export const authenticationService = {
    currentUser: currentUserSubject.asObservable(),
    currentUserAuthorities: currentUserSubject.value.authorities.map((it) => it.authority),
    get currentUserValue() { return currentUserSubject.value }
};