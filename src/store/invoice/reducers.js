import {
    ADD_INVOICE_FAIL,
    ADD_INVOICE_REQUEST,
    ADD_INVOICE_SUCESS,

    DEL_INVOICE_FAIL,
    DEL_INVOICE_REQUEST,
    DEL_INVOICE_SUCESS,

    DEL_INVOICE_CLIENT_FAIL,
    DEL_INVOICE_CLIENT_REQUEST,
    DEL_INVOICE_CLIENT_SUCESS,



} from './Constant'
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

export const AddInvoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        //add service
        case ADD_INVOICE_REQUEST: {
            return {
                ...state,
                loading: false,
            }
        }
        case ADD_INVOICE_SUCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            }
        }
        case ADD_INVOICE_FAIL: {
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

export const DelInvoiceReducer = (state = initialState1, action) => {
    switch (action.type) {
        //add service
        case DEL_INVOICE_REQUEST: {
            return {
                ...state,
                loading: false,
            }
        }
        case DEL_INVOICE_SUCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            }
        }
        case DEL_INVOICE_FAIL: {
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

export const DelInvoicClienteReducer = (state = initialState2, action) => {
    switch (action.type) {
        //add service
        case DEL_INVOICE_CLIENT_REQUEST: {
            return {
                ...state,
                loading: false,
            }
        }
        case DEL_INVOICE_CLIENT_SUCESS: {
            return {
                loading: false,
                data: action.payload,
                error: ""
            }
        }
        case DEL_INVOICE_CLIENT_FAIL: {
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