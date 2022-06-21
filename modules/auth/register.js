import { createAction, handleActions } from 'redux-actions';
import {call, put, takeLatest} from 'redux-saga/effects';

import axios from 'axios'
import {SERVER, headers} from "@/modules/auth/server"
//https://stackoverflow.com/questions/55869455/create-action-with-payload
export const initialState = {
    isRegistered: false
}

const REGISTER_REQUEST = 'auth/REGISTER_REQUEST';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';
/** createAction 을 사용하기 전 학습용 백업
export const registerRequest = user => {
    console.log(" **** register *** "+JSON.stringify(user))
    return  {type: REGISTER_REQUEST, user}
} */
export const registerRequest = createAction(REGISTER_REQUEST, data=>data)
export function* registerSaga() {
    yield takeLatest(REGISTER_REQUEST, signup);
}
function* signup(action) {
    try {
        console.log(" **** 여기가 핵심 *** "+JSON.stringify(action))
        const response = yield call(registerAPI, action.payload)
        console.log(" 회원가입 서버다녀옴: " + JSON.stringify(response.data))
        yield put({type: REGISTER_SUCCESS, payload: response.data})
        yield put((window.location.href = "/auth/login"));
    } catch (error) {
        yield put({type: REGISTER_FAILURE, payload: error.message})
    }
}
const registerAPI = payload => axios.post(
    `${SERVER}/users/join`,
    payload,
    {headers}
)
/**
const register = handleActions({
    [HYDRATE] : (state,action) => ({...state, payload: action.payload}),
    [REGISTER_SUCCESS] : (state,_action) => ({...state, isRegistered: true}),
    [REGISTER_FAILURE] : (state,_action) => ({...state, isRegistered: false})
},initialState)
 handleActions을 사용하기 전 학습용 백업 */
const register = (state = initialState, action) => {
    switch (action.type) {
        
        case REGISTER_SUCCESS:
            console.log(' ### 회원가입 성공 ### ' + JSON.stringify(action.payload))
            return {
                ...state,
                isRegistered: true
            }
        case REGISTER_FAILURE:
            console.log(' ### 회원가입 실패 ### ' + JSON.stringify(action.payload))
            return {
                ...state,
                isRegistered: action.payload
            }
        default:
            return state;
    }
}

export default register