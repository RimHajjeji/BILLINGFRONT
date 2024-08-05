import {
    SHOW_MATERIAL_REQUEST,
    SHOW_MATERIAL_SUCCESS,
    SHOW_MATERIAL_FAIL,

    ADD_MATERIA_REQUEST,
    ADD_MATERIA_SUCCESS,
    ADD_MATERIA_FAIL,

    DEL_MATERIA_REQUEST,
    DEL_MATERIA_SUCCESS,
    DEL_MATERIA_FAIL,

    UPD_MATERIA_REQUEST,
    UPD_MATERIA_SUCCESS,
    UPD_MATERIA_FAIL,

} from './constant'
import axios from 'axios'
import { baseUrl } from '../../config/base'
import { type } from '@testing-library/user-event/dist/type'

export const Show_material_byCompany = (data) => {
    return (dispatch) => {
        dispatch({ type: SHOW_MATERIAL_REQUEST })
        return axios
            .get(`${baseUrl}/material/show/material/company/${data}`)
            .then((res) => {
                dispatch({
                    type: SHOW_MATERIAL_SUCCESS,
                    payload: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: SHOW_MATERIAL_FAIL,
                    payload: err,
                })
            })
    }
}

export const Add_material = (data,id=null) => {
    return (dispatch) => {
        dispatch({ type: ADD_MATERIA_REQUEST })
        return axios
            .post(`${baseUrl}/material/add`, data)
            .then((res) => {
                dispatch({
                    type: ADD_MATERIA_SUCCESS,
                    payload: res.data,
                })
                if(id!==null)
                dispatch(Show_material_byCompany(id))
            })
            .catch((err) => {
                dispatch({
                    type: ADD_MATERIA_FAIL,
                    payload: err,
                })
            })
    }
}

export const Del_material = (data,id=null) => {
    console.log('data is',data)
    return async (dispatch) => {
        dispatch({ type: DEL_MATERIA_REQUEST })
        return await axios
            .delete(`${baseUrl}/material/delete/${data}`)
             .then(async(res) => {
                dispatch({
                    type: DEL_MATERIA_SUCCESS,
                    payload: res.data,
                })
                if(id!==null)
                await dispatch(Show_material_byCompany(id))
            })
            .catch((err) => {
                dispatch({
                    type: DEL_MATERIA_FAIL,
                    payload: err,
                })
            })
    }

}

export const Upd_material = (idmaterial,data,id=null) => {
    console.log('data is',idmaterial,data)
    return async (dispatch) => {
        dispatch({ type: UPD_MATERIA_REQUEST })
        return await axios
            .put(`${baseUrl}/material/upd/${idmaterial}`, data )
             .then(async(res) => {
                dispatch({
                    type: UPD_MATERIA_SUCCESS,
                    payload: res.data,
                })
                if(id!==null)
                await dispatch(Show_material_byCompany(id))
            })
            .catch((err) => {
                dispatch({
                    type: UPD_MATERIA_FAIL,
                    payload: err,
                })
            })
    }

}
