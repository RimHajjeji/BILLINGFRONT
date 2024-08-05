import {
    ADD_INVOICE_FAIL,
    ADD_INVOICE_REQUEST,
    ADD_INVOICE_SUCESS,

    DEL_INVOICE_FAIL,
    DEL_INVOICE_REQUEST,
    DEL_INVOICE_SUCESS,

    DEL_INVOICE_CLIENT_FAIL,
    DEL_INVOICE_CLIENT_REQUEST,
    DEL_INVOICE_CLIENT_SUCESS,


} from './Constant'
import axios from 'axios'
import { baseUrl } from '../../config/base'
import { Home } from '../home/action'
import { Show_invoice_byClient } from '../client/action'



export const Add_Invoice = (data, history) => {
    return (dispatch) => {
        dispatch({ type: ADD_INVOICE_REQUEST })
        return axios
            .post(`${baseUrl}/invoice/add`, data)
            .then((res) => {
                dispatch({
                    type: ADD_INVOICE_SUCESS,
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
                    type: ADD_INVOICE_FAIL,
                    payload: err,
                })
            })
    }
}

export const del_Invoice = (idinvoice, id = null) => {
    return (dispatch) => {
        dispatch({ type: DEL_INVOICE_REQUEST })
        return axios
            .delete(`${baseUrl}/invoice/delete/${idinvoice}`)
            .then(async (res) => {
                dispatch({
                    type: DEL_INVOICE_SUCESS,
                    payload: res.data,
                })
                if (id !== null)
                    await dispatch(Home(id))
            })
            .catch((err) => {
                dispatch({
                    type: DEL_INVOICE_FAIL,
                    payload: err,
                })
            })
    }
}

export const del_Invoice_byclient = (idinvoice, id = null) => {
    return (dispatch) => {
        dispatch({ type: DEL_INVOICE_CLIENT_REQUEST })
        return axios
            .delete(`${baseUrl}/invoice/delete/${idinvoice}`)
            .then(async (res) => {
                dispatch({
                    type: DEL_INVOICE_CLIENT_SUCESS,
                    payload: res.data,
                })
                if (id !== null)
                    await dispatch(Show_invoice_byClient(id))
            })
            .catch((err) => {
                dispatch({
                    type: DEL_INVOICE_CLIENT_FAIL,
                    payload: err,
                })
            })
    }
}