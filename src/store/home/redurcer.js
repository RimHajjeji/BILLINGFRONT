import { CALANDER_REQUEST, CALANDER_FAIL, CALANDER_SUCCESS, ETAT_INVOICE_FAIL, ETAT_INVOICE_SUCCESS, ETAT_INVOICE_REQUEST } from './constant'
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

export const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALANDER_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case CALANDER_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case CALANDER_FAIL: {
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

export const EtatsInvoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ETAT_INVOICE_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case ETAT_INVOICE_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case ETAT_INVOICE_FAIL: {
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
