import {
    CHECK_EMAIL_REQUEST,
    CHECK_EMAIL_SUCCESS,
    CHECK_EMAIL_FAIL
} from './constant'
import axios from 'axios'
import { baseUrl } from '../../../../config/base'
import { RegiSCompany } from '../company/action'
export const CheckEmail = (data) => {
    return (dispatch) => {
        dispatch({ type: CHECK_EMAIL_REQUEST })
        return axios
            .post(`${baseUrl}/registre/user/checkmail`, data)
            .then((res) => {
                dispatch({
                    type: CHECK_EMAIL_SUCCESS,
                    payload: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: CHECK_EMAIL_FAIL,
                    payload: err,
                })
            })
    }
}