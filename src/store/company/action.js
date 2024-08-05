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
import axios from 'axios'
import { baseUrl } from '../../config/base'
/* const Iduser= useSelector(state => state?.LoginUser?.data?.new?._id) */

export const Show_company_byUser = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_COMPANY_BYUSER_REQUEST })
        return axios
            .get(`${baseUrl}/company/show/user/company/${data}`)
            .then(async (res) => {
                dispatch({
                    type: SHOW_COMPANY_BYUSER_SUCCESS,
                    payload: res.data,
                })

            })
            .catch((err) => {
                dispatch({
                    type: SHOW_COMPANY_BYUSER_FAIL,
                    payload: err,
                })
            })
    }


}

export const Up_company = (idcompany, data, id = null) => {
    return (dispatch) => {
        dispatch({ type: UP_COMPANY_BYUSER_REQUEST })
        return axios
            .put(`${baseUrl}/company/upd/${idcompany}`, data)
            .then(async (res) => {
                dispatch({
                    type: UP_COMPANY_BYUSER_SUCCESS,
                    payload: res.data,
                })
                if (id !== null)
                    await dispatch(Show_company_byUser(id))
            })
            .catch((err) => {
                dispatch({
                    type: UP_COMPANY_BYUSER_FAIL,
                    payload: err,
                })
            })
    }


}

export const Show_All_company = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_ALL_COMPANY_BYUSER_REQUEST })
        return axios
            .get(`${baseUrl}/company/show`)
            .then(async (res) => {
                dispatch({
                    type: SHOW_ALL_COMPANY_BYUSER_SUCCESS,
                    payload: res.data,
                })

            })
            .catch((err) => {
                dispatch({
                    type: SHOW_ALL_COMPANY_BYUSER_FAIL,
                    payload: err,
                })
            })
    }


}
