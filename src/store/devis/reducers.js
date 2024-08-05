import {
    ADD_DEVIS_REQUEST,
    ADD_DEVIS_SUCESS,
    ADD_DEVIS_FAIL,
    DEL_DEVIS_REQUEST,
    DEL_DEVIS_SUCESS,
    DEL_DEVIS_FAIL,
    DEL_DEVIS_CLIENT_REQUEST,
    DEL_DEVIS_CLIENT_SUCESS,
    DEL_DEVIS_CLIENT_FAIL,
} from './Constant';

const initialState = {
    loading: false,
    data: {},
    error: ""
};

const initialState1 = {
    loading: false,
    data: {},
    error: ""
};

const initialState2 = {
    loading: false,
    data: {},
    error: ""
};

export const AddDevisReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEVIS_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case ADD_DEVIS_SUCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            };
        }
        case ADD_DEVIS_FAIL: {
            return {
                loading: false,
                data: {},
                error: action.payload
            };
        }
        default:
            return state;
    }
}

export const DelDevisReducer = (state = initialState1, action) => {
    switch (action.type) {
        case DEL_DEVIS_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case DEL_DEVIS_SUCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            };
        }
        case DEL_DEVIS_FAIL: {
            return {
                loading: false,
                data: {},
                error: action.payload
            };
        }
        default:
            return state;
    }
}

export const DelDevisClienteReducer = (state = initialState2, action) => {
    switch (action.type) {
        case DEL_DEVIS_CLIENT_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case DEL_DEVIS_CLIENT_SUCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            };
        }
        case DEL_DEVIS_CLIENT_FAIL: {
            return {
                loading: false,
                data: {},
                error: action.payload
            };
        }
        default:
            return state;
    }
}
