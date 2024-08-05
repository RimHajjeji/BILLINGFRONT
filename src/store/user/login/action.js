import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
}

    from './constant'
import axios from 'axios'
import { baseUrl } from '../../../config/base'
import { Show_company_byUser } from '../../company/action'


export const LoginUser = (data) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_REQUEST })
        return axios
            .post(`${baseUrl}/login/user`, data, {
                withCredentials: true, headers: {
                    origin: `${baseUrl}/`, 'Content-Type': 'application/json; charset=UTF-8',
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": 'http://localhost:3002/'
                }
            })
            .then((res) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                })
                dispatch(Show_company_byUser(res?.data?.new?._id))
            })
            .catch((err) => {
                console.log('errerer', err.message)
                dispatch({
                    type: LOGIN_FAIL,
                    payload: err,
                })
            })
    }





}
