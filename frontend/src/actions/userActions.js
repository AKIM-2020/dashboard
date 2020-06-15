import { userConstants } from "../constants";
import axios from 'axios';

const login = (username, password) => {
    return dispatch => {
        dispatch(request({ username }));
        axios.post(`/api/auth/signin`, { login: username, password: password })
            .then(
                response => {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    dispatch(success(response.data));
                },
                error => {
                    logout();
                    dispatch(failure(error));
                    //dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
};

const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
};

export const userActions = {
    login,
    logout
};
