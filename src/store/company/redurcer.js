import {
  SHOW_COMPANY_BYUSER_REQUEST,
  SHOW_COMPANY_BYUSER_SUCCESS,
  SHOW_COMPANY_BYUSER_FAIL,


  UP_COMPANY_BYUSER_REQUEST,
  UP_COMPANY_BYUSER_SUCCESS,
  UP_COMPANY_BYUSER_FAIL,

  SHOW_ALL_COMPANY_BYUSER_FAIL,
  SHOW_ALL_COMPANY_BYUSER_REQUEST,
  SHOW_ALL_COMPANY_BYUSER_SUCCESS,

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


export const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_COMPANY_BYUSER_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case SHOW_COMPANY_BYUSER_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case SHOW_COMPANY_BYUSER_FAIL: {
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

export const UpCompanyReducer = (state = initialState1, action) => {
  switch (action.type) {
    case UP_COMPANY_BYUSER_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case UP_COMPANY_BYUSER_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case UP_COMPANY_BYUSER_FAIL: {
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

export const ShowALLCompanyReducer = (state = initialState2, action) => {
  switch (action.type) {
    case SHOW_ALL_COMPANY_BYUSER_REQUEST: {
      return {
        ...state,
        loading: false,
      }
    }
    case SHOW_ALL_COMPANY_BYUSER_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        error: ""
      }
    }
    case SHOW_ALL_COMPANY_BYUSER_FAIL: {
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





