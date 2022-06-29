import { takeEvery, all } from 'redux-saga/effects'
import { SET_AUTH_REQ, SET_AUTH_ERROR_REQ } from './actionsType'
import { setAuth, setAuthError } from './AuthenUser'


function* watcherSetAuth() {
    yield takeEvery(SET_AUTH_REQ, setAuth)
}

function* watcherSetAuthError() {
    yield takeEvery(SET_AUTH_ERROR_REQ, setAuthError)
}

// function* watcher

export default function* rootSaga() {
    yield all([
        watcherSetAuth(),
        watcherSetAuthError(),
    ])
}