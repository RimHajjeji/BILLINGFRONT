import { REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from './constant'
import axios from 'axios'
import { baseUrl } from '../../../../config/base'
import { RegiSCompany } from '../company/action'
export const RegisterUser = (data, alert = null, history) => {
    return (dispatch) => {
        dispatch({ type: REGISTER_REQUEST })
        return axios
            .post(`${baseUrl}/registre/user`, data)
            .then((res) => {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data,
                })

                if (alert)
                    alert(true)
                history && history.push('/login')
            })
            .catch((err) => {
                dispatch({
                    type: REGISTER_FAIL,
                    payload: err,
                })
            })
    }
}