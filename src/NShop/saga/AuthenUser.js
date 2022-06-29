import { put } from 'redux-saga/effects'
import { SET_AUTH, SET_AUTH_ERROR } from './actionsType'


export function* setAuth({ payload }) {
    yield put({ type: SET_AUTH, payload: payload })
}

export function* setAuthError({ payload }) {
    yield put({ type: SET_AUTH_ERROR, payload })
}