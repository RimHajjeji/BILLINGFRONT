import { REFRESH_TOKEN_FAIL, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS } from './constant'
import { LOGIN_SUCCESS } from '../login/constant'
import axios from 'axios'
import { baseUrl } from '../../../config/base'
import { Show_company_byUser } from '../../company/action'
export const Refresh_access = (id) => {
    return (dispatch) => {
        dispatch({ type: REFRESH_TOKEN_REQUEST })
        return axios
            .post(`${baseUrl}/login/refresh`, { id: id },
                {
                    withCredentials: true, headers: {
                        origin: `${baseUrl}/`, 'Content-Type': 'application/json; charset=UTF-8',
                        "Access-Control-Allow-Credentials": true,
                        "Access-Control-Allow-Origin": 'http://localhost:3002/'
                    }
                }
            )
            .then((res) => {
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                    payload: res.data,
                })
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
                dispatch(Show_company_byUser(res.data.new?._id))
            })
            .catch((err) => {
                dispatch({
                    type: REFRESH_TOKEN_FAIL,
                    payload: err,
                })
            })
    }
}