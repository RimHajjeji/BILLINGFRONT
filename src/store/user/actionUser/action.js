import {
    SHOW_USER_REQUEST,
    SHOW_USER_SUCCESS,
    SHOW_USER_FAIL,

    UPD_USER_REQUEST,
    UPD_USER_SUCCESS,
    UPD_USER_FAIL,

    UPD_ABON_FAIL,
    UPD_ABON_REQUEST,
    UPD_ABON_SUCCESS,

    USER_ETATS_UPDATE_REQUEST,
    USER_ETATS_UPDATE_SUCESS,
    USER_ETATS_UPDATE_FAIL,


}

    from './constant'
import axios from 'axios'
import { baseUrl } from '../../../config/base'
import { Home } from '../../home/action'
import { Show_All_company } from '../../company/action'


export const ShowUser = () => {
    return (dispatch) => {
        dispatch({ type: SHOW_USER_REQUEST })
        return axios
            .get(`${baseUrl}/user/show`)
            .then((res) => {
                dispatch({
                    type: SHOW_USER_SUCCESS,
                    payload: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: SHOW_USER_FAIL,
                    payload: err,
                })
            })
    }
}

export const UpdUser = (iduser, data, id = null) => {
    return (dispatch) => {
        dispatch({ type: UPD_USER_REQUEST })
        return axios
            .put(`${baseUrl}/user/upd/${iduser}`, data)
            .then(async (res) => {
                dispatch({
                    type: UPD_USER_SUCCESS,
                    payload: res.data,
                })
                if (id !== null)
                    await dispatch(Home(id))
            })
            .catch((err) => {
                dispatch({
                    type: UPD_USER_FAIL,
                    payload: err,
                })
            })
    }
}

export const Upd_abon_user = (iduser, data) => {
    console.log('data is', iduser, data)
    return async (dispatch) => {
        dispatch({ type: UPD_ABON_REQUEST })
        return await axios
            .put(`${baseUrl}/user/upd/abon/${iduser}`, data)
            .then((res) => {
                dispatch({
                    type: UPD_ABON_SUCCESS,
                    payload: res.data,
                })
                dispatch(Show_All_company())
            })
            .catch((err) => {
                dispatch({
                    type: UPD_ABON_FAIL,
                    payload: err,
                })
            })
    }

}

export const Update_etat_user = (idc, data) => {
    const obj = {
        etats: data
    }
    return (dispatch) => {
        dispatch({ type: USER_ETATS_UPDATE_REQUEST })
        return axios
            .put(`${baseUrl}/user/upd/etat/${idc}`, obj)
            .then((res) => {
                dispatch({
                    type: USER_ETATS_UPDATE_SUCESS,
                    payload: res.data,
                })
                dispatch(Show_All_company())
            })
            .catch((err) => {
                dispatch({
                    type: USER_ETATS_UPDATE_FAIL,
                    payload: err,
                })
            })
    }
}