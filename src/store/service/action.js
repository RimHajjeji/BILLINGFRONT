import {
    SHOW_SERVICE_REQUEST,
    SHOW_SERVICE_SUCCESS,
    SHOW_SERVICE_FAIL,

    ADD_SERVICE_REQUEST,
    ADD_SERVICE_SUCCESS,
    ADD_SERVICE_FAIL,

    DEL_SERVICE_REQUEST,
    DEL_SERVICE_SUCCESS,
    DEL_SERVICE_FAIL,

    UPD_SERVICE_REQUEST,
    UPD_SERVICE_SUCCESS,
    UPD_SERVICE_FAIL,

} from './constant'
import axios from 'axios'
import { baseUrl } from '../../config/base'
import { type } from '@testing-library/user-event/dist/type'

export const Show_service_byCompany = (data) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_SERVICE_REQUEST })
        return await axios
            .get(`${baseUrl}/service/show/service/company/${data}`)
            .then((res) => {
                dispatch({
                    type: SHOW_SERVICE_SUCCESS,
                    payload: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: SHOW_SERVICE_FAIL,
                    payload: err,
                })
            })
    }
}

export const Add_service = (data, id = null) => {
    return (dispatch) => {
        dispatch({ type: ADD_SERVICE_REQUEST })
        return axios
            .post(`${baseUrl}/service/add`, data)
            .then((res) => {
                dispatch({
                    type: ADD_SERVICE_SUCCESS,
                    payload: res.data,
                })
                if (id !== null)
                    dispatch(Show_service_byCompany(id))
            })
            .catch((err) => {
                dispatch({
                    type: ADD_SERVICE_FAIL,
                    payload: err,
                })
            })
    }
}

export const Del_service = (data, id = null) => {
    console.log('data is', data)
    return async (dispatch) => {
        dispatch({ type: DEL_SERVICE_REQUEST })
        return await axios
            .delete(`${baseUrl}/service/delete/${data}`)
            .then(async (res) => {
                dispatch({
                    type: DEL_SERVICE_SUCCESS,
                    payload: res.data,
                })
                if (id !== null)
                    await dispatch(Show_service_byCompany(id))
            })
            .catch((err) => {
                dispatch({
                    type: DEL_SERVICE_FAIL,
                    payload: err,
                })
            })
    }

}

export const Upd_service = (idservice, data, id = null) => {
    console.log('data is', idservice, data)
    return async (dispatch) => {
        dispatch({ type: UPD_SERVICE_REQUEST })
        return await axios
            .put(`${baseUrl}/service/upd/${idservice}`, data)
            .then(async (res) => {
                dispatch({
                    type: UPD_SERVICE_SUCCESS,
                    payload: res.data,
                })
                if (id !== null)
                    await dispatch(Show_service_byCompany(id))
            })
            .catch((err) => {
                dispatch({
                    type: UPD_SERVICE_FAIL,
                    payload: err,
                })
            })
    }

}
