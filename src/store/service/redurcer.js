import {
  SHOW_SERVICE_REQUEST,
  SHOW_SERVICE_SUCCESS,
  SHOW_SERVICE_FAIL,

  ADD_SERVICE_REQUEST,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAIL,

  DEL_SERVICE_REQUEST,
  DEL_SERVICE_SUCCESS,
  DEL_SERVICE_FAIL,

  UPD_SERVICE_REQUEST,
  UPD_SERVICE_SUCCESS,
  UPD_SERVICE_FAIL,
  

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

export const ShowServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SERVICE_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case SHOW_SERVICE_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case SHOW_SERVICE_FAIL: {
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

export const AddServiceReducer = (state = initialState1, action) => {
  switch (action.type) {
    //add service
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

export const DeleteServiceReducer = (state = initialState2, action) => {
  switch (action.type) {

  
    //del service
    case DEL_SERVICE_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case DEL_SERVICE_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case DEL_SERVICE_FAIL: {
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

export const UpdateServiceReducer = (state = initialState3, action) => {
  switch (action.type) {

  
    //del service
    case UPD_SERVICE_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case UPD_SERVICE_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case UPD_SERVICE_FAIL: {
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