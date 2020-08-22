import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer'
import { contentType } from './contentReducer'
import {balanceReducer} from "./balanceReducer";

const rootReducer = combineReducers({
    authentication,
    contentType,
    balanceReducer
});

export default rootReducer;