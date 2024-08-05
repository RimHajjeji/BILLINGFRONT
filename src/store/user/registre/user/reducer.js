import { REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from './constant'
const initialState = {
    loading: false,
    data: {},
    error: ""
};
const RegistreUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                loading: false,
            }
        }
        case REGISTER_SUCCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            }
        }
        case REGISTER_FAIL: {
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

export default RegistreUserReducer;