import { combineReducers } from 'redux';
import userInfo from './userInfo';
import subjectsInfo from './subjectsInfo'

const rootReducer = combineReducers({
    userInfo,
    subjectsInfo
});

export default rootReducer;
