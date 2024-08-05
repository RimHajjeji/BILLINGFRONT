import {
  SHOW_CLIENT_REQUEST,
  SHOW_CLIENT_SUCCESS,
  SHOW_CLIENT_FAIL,

  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAIL,

  DEL_CLIENT_REQUEST,
  DEL_CLIENT_SUCCESS,
  DEL_CLIENT_FAIL,

  UPD_CLIENT_REQUEST,
  UPD_CLIENT_SUCCESS,
  UPD_CLIENT_FAIL,

  SHOW_INVOICE_BYCLIENT_REQUEST,
  SHOW_INVOICE_BYCLIENT_SUCCESS,
  SHOW_INVOICE_BYCLIENT_FAIL,

  SHOW_CLIENT_ETATS_UPDATE_REQUEST,
  SHOW_CLIENT_ETATS_UPDATE_FAIL,
  SHOW_CLIENT_ETATS_UPDATE_SUCESS,


} from './constant'

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

const initialState3 = {
  loading: false,
  data: {},
  error: ""
};

const initialState4 = {
  loading: false,
  data: {},
  error: ""
};

export const ShowClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CLIENT_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case SHOW_CLIENT_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case SHOW_CLIENT_FAIL: {
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

export const AddClientReducer = (state = initialState1, action) => {
  switch (action.type) {
    //add service
    case ADD_CLIENT_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case ADD_CLIENT_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case ADD_CLIENT_FAIL: {
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

export const DeleteClientReducer = (state = initialState2, action) => {
  switch (action.type) {


    //del service
    case DEL_CLIENT_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case DEL_CLIENT_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case DEL_CLIENT_FAIL: {
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

export const UpdateClientReducer = (state = initialState3, action) => {
  switch (action.type) {


    //del service
    case UPD_CLIENT_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case UPD_CLIENT_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case UPD_CLIENT_FAIL: {
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

export const ShowInvoiceBYClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_INVOICE_BYCLIENT_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case SHOW_INVOICE_BYCLIENT_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case SHOW_INVOICE_BYCLIENT_FAIL: {
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

export const UpdateClientEtat = (state = initialState4, action) => {
  switch (action.type) {
    case SHOW_CLIENT_ETATS_UPDATE_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case SHOW_CLIENT_ETATS_UPDATE_SUCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case SHOW_CLIENT_ETATS_UPDATE_FAIL: {
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
/* const AddServiceReducer = (state = initialState1, action) => {
  switch (action.type) {
    case ADD_SERVICE_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case ADD_SERVICE_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case ADD_SERVICE_FAIL: {
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


export {
  ServiceReducer,
  AddServiceReducer,
};
 */