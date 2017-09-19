import types from '../constants/actionTypes';


function subjectsInfo(state = null, action) {
    switch (action.type) {
        case types.REPLACE_SUBJECT_INFO:
            return action.subjectList;
        default:
            return state
    }
}

export default subjectsInfo
