import {
  UPD_PASS_USER_REQUEST,
  UPD_PASS_USER_SUCCESS,
  UPD_PASS_USER_FAIL,

}

  from './constant'
const initialState = {
  loading: false,
  data: {},
  error: ""
};



export const ChangePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPD_PASS_USER_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case UPD_PASS_USER_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case UPD_PASS_USER_FAIL: {
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


