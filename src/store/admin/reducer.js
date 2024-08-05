import {
    REGISTER_ADMIN_REQUEST,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAIL

} from './constant'
const initialState = {
    loading: false,
    data: {},
    error: ""
};
export const RegistreAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_ADMIN_REQUEST: {
            return {
                ...state,
                loading: false,
            }
        }
        case REGISTER_ADMIN_SUCCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            }
        }
        case REGISTER_ADMIN_FAIL: {
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

