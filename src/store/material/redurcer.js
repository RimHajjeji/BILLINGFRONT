import {
  SHOW_MATERIAL_REQUEST,
  SHOW_MATERIAL_SUCCESS,
  SHOW_MATERIAL_FAIL,

  ADD_MATERIA_REQUEST,
  ADD_MATERIA_SUCCESS,
  ADD_MATERIA_FAIL,

  DEL_MATERIA_REQUEST,
  DEL_MATERIA_SUCCESS,
  DEL_MATERIA_FAIL,

  UPD_MATERIA_REQUEST,
  UPD_MATERIA_SUCCESS,
  UPD_MATERIA_FAIL,

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

export const ShowMaterialReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MATERIAL_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case SHOW_MATERIAL_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case SHOW_MATERIAL_FAIL: {
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

export const AddMaterialReducer = (state = initialState1, action) => {
  switch (action.type) {
    //add service
    case ADD_MATERIA_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case ADD_MATERIA_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case ADD_MATERIA_FAIL: {
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

export const DeleteMaterialReducer = (state = initialState2, action) => {
  switch (action.type) {

  
    //del service
    case DEL_MATERIA_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case DEL_MATERIA_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case DEL_MATERIA_FAIL: {
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

export const UpdateMaterialReducer = (state = initialState3, action) => {
  switch (action.type) {

  
    //del service
    case UPD_MATERIA_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case UPD_MATERIA_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case UPD_MATERIA_FAIL: {
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