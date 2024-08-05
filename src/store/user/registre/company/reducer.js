import { REGISTERC_FAIL, REGISTERC_REQUEST, REGISTERC_SUCCESS } from './constant'
const initialState = {
    loading: false,
    data: {},
    error: ""
};
const RegistreCompanyReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTERC_REQUEST: {
            return {
                ...state,
                loading: false,
            }
        }
        case REGISTERC_SUCCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            }
        }
        case REGISTERC_FAIL: {
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

export default RegistreCompanyReducer;