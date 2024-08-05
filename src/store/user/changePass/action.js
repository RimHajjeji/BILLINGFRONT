import {
    UPD_PASS_USER_REQUEST,
    UPD_PASS_USER_SUCCESS,
    UPD_PASS_USER_FAIL,


}

    from './constant'
import axios from 'axios'
import { baseUrl } from '../../../config/base'
import { Home } from '../../home/action'
import { Show_All_company } from '../../company/action'


export const ChangePassword = (iduser, data) => {
    return (dispatch) => {
        dispatch({ type: UPD_PASS_USER_REQUEST })
        return axios
            .put(`${baseUrl}/registre/upd/pass/${iduser}`, data)
            .then((res) => {
                dispatch({
                    type: UPD_PASS_USER_SUCCESS,
                    payload: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: UPD_PASS_USER_FAIL,
                    payload: err.status,
                })
            })
    }


}
