import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
}

  from './constant'
const initialState = {
  loading: false,
  data: {},
  error: ""
};

const LoginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case LOGIN_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case LOGIN_FAIL: {
      return {
        loading: false,
        data: {},
        error: action.payload
      }
    }
    case LOGOUT: {
      return {
        loading: true,
        data: action.payload,
        error: ""
      }
    }
    default:
      return state;
  }
}
export default LoginUserReducer;
