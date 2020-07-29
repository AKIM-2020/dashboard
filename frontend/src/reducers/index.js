import { combineReducers } from 'redux';
import { authentication } from './authenticationReducer'
import { contentType } from './contentReducer'

const rootReducer = combineReducers({
    authentication,
    contentType
});

export default rootReducer;