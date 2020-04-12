import { userConstants } from "../constants/userConstants";

let user = JSON.parse(localStorage.getItem('user')); // todo create user item
const initialState = user ? { loggedIn: false, user } : { loggedIn: false }; // todo remove negative case

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}