import { api } from '../helpers'

const login = (username, password) => {
    return api.post(`/api/auth/signin`, { username: username, password: password })
        .then(response => {
            console.log(response);
            localStorage.setItem('user', JSON.stringify(response.data))
        }, error => {
            console.log(error);
            logout();
            window.location.reload();
        })
};

const logout = () => {
    localStorage.removeItem('user');
};

export const userService = {
    login,
    logout
};