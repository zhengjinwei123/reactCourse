import types from '../constants/actionTypes';
import utils from '../util/utils.js';

function replaceUserInfo(userInfo) {
    return {
        type: types.REPLACE_USER_INFO,
        userInfo
    }
}

function clearUserInfo() {
    return {type: types.CLEAR_USER_INFO}
}

function fetchUserInfo() {
    return dispatch => {
        utils.ajax({
            url: '/api/user/getUserInfo',
            type: 'get'
        }).then(res => {
            dispatch(replaceUserInfo(res))
        })
    }
}

function replaceSubjectsInfo(subjectList){
    return {
        type: types.REPLACE_SUBJECT_INFO,
        subjectList
    }
}

function fetchSubjectsInfo(){
    return dispatch=>{
        utils.ajax({
            url:'api/subjects/getSubjects',
            type:'get'
        }).then(res=>{
            if(res && res.data){
                dispatch(replaceSubjectsInfo(res.data))
            }

        })
    }
}


export default {
    replaceUserInfo,
    fetchUserInfo,
    clearUserInfo,
    fetchSubjectsInfo
}
