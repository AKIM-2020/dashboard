import { userConstants } from "../constants/userConstants";

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user, goToMain: false, error: false }
: { loggedIn: false, goToMain: false, error: false };

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggedIn: false,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user,
                goToMain: true
            };
        case userConstants.GOTOMAIN:
            return {
                ...state,
                goToMain: false
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                error: true
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}