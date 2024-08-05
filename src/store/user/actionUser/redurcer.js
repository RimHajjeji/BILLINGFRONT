import {
  SHOW_USER_REQUEST,
  SHOW_USER_SUCCESS,
  SHOW_USER_FAIL,

  UPD_USER_REQUEST,
  UPD_USER_SUCCESS,
  UPD_USER_FAIL,

  UPD_ABON_FAIL,
  UPD_ABON_REQUEST,
  UPD_ABON_SUCCESS,

  USER_ETATS_UPDATE_REQUEST,
  USER_ETATS_UPDATE_SUCESS,
  USER_ETATS_UPDATE_FAIL,
}

  from './constant'
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

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_USER_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case SHOW_USER_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case SHOW_USER_FAIL: {
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


export const UpdUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPD_USER_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case UPD_USER_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case UPD_USER_FAIL: {
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

export const UpdAbonUserReducer = (state = initialState1, action) => {
  switch (action.type) {
    case UPD_ABON_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case UPD_ABON_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case UPD_ABON_FAIL: {
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

export const UpdEtatsUserReducer = (state = initialState2, action) => {
  switch (action.type) {
    case USER_ETATS_UPDATE_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case USER_ETATS_UPDATE_SUCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case USER_ETATS_UPDATE_FAIL: {
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
