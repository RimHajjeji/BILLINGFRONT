import { REGISTERC_FAIL, REGISTERC_REQUEST, REGISTERC_SUCCESS } from './constant'
import axios from 'axios'
import { baseUrl } from '../../../../config/base'

export const RegiSCompany = (data) => {
    return (dispatch) => {
        dispatch({ type: REGISTERC_REQUEST })
        return axios
            .post(`${baseUrl}/company/add`, data)
            .then((res) => {
                dispatch({
                    type: REGISTERC_SUCCESS,
                    payload: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: REGISTERC_FAIL,
                    payload: err,
                })
            })
    }
}