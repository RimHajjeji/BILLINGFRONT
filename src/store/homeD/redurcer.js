import { CALANDER_REQUEST, CALANDER_FAIL, CALANDER_SUCCESS, ETAT_DEVIS_FAIL, ETAT_DEVIS_SUCCESS, ETAT_DEVIS_REQUEST } from './constant'
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

export const EtatsDevisReducer = (state = initialState, action) => {
  switch (action.type) {
    case ETAT_DEVIS_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case ETAT_DEVIS_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case ETAT_DEVIS_FAIL: {
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
