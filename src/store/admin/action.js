import {
    REGISTER_ADMIN_REQUEST,
    REGISTER_ADMIN_SUCCESS,
    REGISTER_ADMIN_FAIL
} from './constant'
import axios from 'axios'
import { baseUrl } from '../../config/base'
import { RegiSCompany, Show_All_company } from '../company/action'


export const RegisterAdmin = (data, alert = null) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_ADMIN_REQUEST })
        return axios
            .post(`${baseUrl}/registre/admin`, data)
            .then((res) => {
                dispatch({
                    type: REGISTER_ADMIN_SUCCESS,
                    payload: res.data,
                })
                if (alert)
                    alert(true)

            })
            .catch((err) => {
                dispatch({
                    type: REGISTER_ADMIN_FAIL,
                    payload: err,
                })
            })
    }
}