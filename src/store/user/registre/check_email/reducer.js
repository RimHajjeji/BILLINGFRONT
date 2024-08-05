import {
    CHECK_EMAIL_REQUEST,
    CHECK_EMAIL_SUCCESS,
    CHECK_EMAIL_FAIL
} from './constant'
const initialState = {
    loading: false,
    data: {},
    error: ""
};
const CheckEmailReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_EMAIL_REQUEST: {
            return {
                ...state,
                loading: false,
            }
        }
        case CHECK_EMAIL_SUCCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            }
        }
        case CHECK_EMAIL_FAIL: {
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

export default CheckEmailReducer;