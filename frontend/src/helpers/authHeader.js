import { BehaviorSubject } from "rxjs";

export const authHeader = () => {
    const currentUser = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUSer')));
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}`};
    } else {
        return {};
    }
};