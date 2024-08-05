import {
    ADD_DEVIS_FAIL,
    ADD_DEVIS_REQUEST,
    ADD_DEVIS_SUCESS,

    DEL_DEVIS_FAIL,
    DEL_DEVIS_REQUEST,
    DEL_DEVIS_SUCESS,

    DEL_DEVIS_CLIENT_FAIL,
    DEL_DEVIS_CLIENT_REQUEST,
    DEL_DEVIS_CLIENT_SUCESS,
} from './Constant'
import axios from 'axios'
import { baseUrl } from '../../config/base'
import { Home } from '../home/action'
import { Show_devis_byClient } from '../client/action'

export const Add_Devis = (data, history) => {
    return (dispatch) => {
        dispatch({ type: ADD_DEVIS_REQUEST })
        return axios
            .post(`${baseUrl}/devis/add`, data)
            .then((res) => {
                dispatch({
                    type: ADD_DEVIS_SUCESS,
                    payload: res.data,
                })
                if (history) {
                    history.push({
                        pathname: '/',
                        state: { added: true }
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: ADD_DEVIS_FAIL,
                    payload: err,
                })
            })
    }
}

export const del_Devis = (iddevis, id = null) => {
    return (dispatch) => {
        dispatch({ type: DEL_DEVIS_REQUEST })
        return axios
            .delete(`${baseUrl}/devis/delete/${iddevis}`)
            .then(async (res) => {
                dispatch({
                    type: DEL_DEVIS_SUCESS,
                    payload: res.data,
                })
                if (id !== null)
                    await dispatch(Home(id))
            })
            .catch((err) => {
                dispatch({
                    type: DEL_DEVIS_FAIL,
                    payload: err,
                })
            })
    }
}

export const del_Devis_byclient = (iddevis, id = null) => {
    return (dispatch) => {
        dispatch({ type: DEL_DEVIS_CLIENT_REQUEST })
        return axios
            .delete(`${baseUrl}/devis/delete/${iddevis}`)
            .then(async (res) => {
                dispatch({
                    type: DEL_DEVIS_CLIENT_SUCESS,
                    payload: res.data,
                })
                if (id !== null)
                    await dispatch(Show_devis_byClient(id))
            })
            .catch((err) => {
                dispatch({
                    type: DEL_DEVIS_CLIENT_FAIL,
                    payload: err,
                })
            })
    }
}
