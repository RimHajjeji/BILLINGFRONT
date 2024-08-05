import { REFRESH_TOKEN_FAIL, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS } from './constant'


const intialState = {
    loading: false,
    data: {},
    error: ""
}

export const Refresh_Reducer = (state = intialState, action) => {
    switch (action.type) {
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                loading: false,
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            }
        }
        case REFRESH_TOKEN_FAIL: {
            return {
                loading: false,
                data: {},
                error: action.payload
            }
        }
        default:
            return state;
    }
}