import { SET_AUTH, SET_AUTH_ERROR } from "../saga/actionsType";

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
}


export function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return {
                user: action.payload
            }

        case SET_AUTH_ERROR:
            return {
                error: action.payload
            }

        default:
            return state
    }
}