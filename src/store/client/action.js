import {
    SHOW_CLIENT_REQUEST,
    SHOW_CLIENT_SUCCESS,
    SHOW_CLIENT_FAIL,

    ADD_CLIENT_REQUEST,
    ADD_CLIENT_SUCCESS,
    ADD_CLIENT_FAIL,

    DEL_CLIENT_REQUEST,
    DEL_CLIENT_SUCCESS,
    DEL_CLIENT_FAIL,

    UPD_CLIENT_REQUEST,
    UPD_CLIENT_SUCCESS,
    UPD_CLIENT_FAIL,

    SHOW_INVOICE_BYCLIENT_REQUEST,
    SHOW_INVOICE_BYCLIENT_SUCCESS,
    SHOW_INVOICE_BYCLIENT_FAIL,

    SHOW_CLIENT_ETATS_UPDATE_FAIL,
    SHOW_CLIENT_ETATS_UPDATE_REQUEST,
    SHOW_CLIENT_ETATS_UPDATE_SUCESS,

    SHOW_DEVIS_BY_CLIENT_REQUEST,
    SHOW_DEVIS_BY_CLIENT_SUCCESS,
    SHOW_DEVIS_BY_CLIENT_FAIL,

} from './constant'
import axios from 'axios'
import { baseUrl } from '../../config/base'
import { type } from '@testing-library/user-event/dist/type'

export const Show_client_byCompany = (data) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_CLIENT_REQUEST })
        return await axios
            .get(`${baseUrl}/client/show/client/company/${data}`)
            .then((res) => {
                dispatch({
                    type: SHOW_CLIENT_SUCCESS,
                    payload: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: SHOW_CLIENT_FAIL,
                    payload: err,
                })
            })
    }
}

export const Add_client = (data, id = null) => {
    return (dispatch) => {
        dispatch({ type: ADD_CLIENT_REQUEST })
        return axios
            .post(`${baseUrl}/client/add`, data)
            .then((res) => {
                dispatch({
                    type: ADD_CLIENT_SUCCESS,
                    payload: res.data,
                })
                if (id !== null)
                    dispatch(Show_client_byCompany(id))
            })
            .catch((err) => {
                dispatch({
                    type: ADD_CLIENT_FAIL,
                    payload: err,
                })
            })
    }
}
export const Update_etat = (data, idc, id = null) => {
    return (dispatch) => {
        dispatch({ type: SHOW_CLIENT_ETATS_UPDATE_REQUEST })
        return axios
            .put(`${baseUrl}/client/upd/etat/${idc}`, data)
            .then((res) => {
                dispatch({
                    type: SHOW_CLIENT_ETATS_UPDATE_SUCESS,
                    payload: res.data,
                })
                if (id !== null)
                    dispatch(Show_client_byCompany(id))
            })
            .catch((err) => {
                dispatch({
                    type: SHOW_CLIENT_ETATS_UPDATE_FAIL,
                    payload: err,
                })
            })
    }
}

export const Del_client = (data, id = null) => {
    console.log('data is', data)
    return async (dispatch) => {
        dispatch({ type: DEL_CLIENT_REQUEST })
        return await axios
            .delete(`${baseUrl}/client/delete/${data}`)
            .then(async (res) => {
                dispatch({
                    type: DEL_CLIENT_SUCCESS,
                    payload: res.data,
                })
                if (id !== null)
                    await dispatch(Show_client_byCompany(id))
            })
            .catch((err) => {
                dispatch({
                    type: DEL_CLIENT_FAIL,
                    payload: err,
                })
            })
    }

}

export const Upd_client = (idservice, data, id = null) => {
    console.log('data is', idservice, data)
    return async (dispatch) => {
        dispatch({ type: UPD_CLIENT_REQUEST })
        return await axios
            .put(`${baseUrl}/client/upd/${idservice}`, data)
            .then(async (res) => {
                dispatch({
                    type: UPD_CLIENT_SUCCESS,
                    payload: res.data,
                })
                if (id !== null)
                    await dispatch(Show_client_byCompany(id))
            })
            .catch((err) => {
                dispatch({
                    type: UPD_CLIENT_FAIL,
                    payload: err,
                })
            })
    }

}


export const Show_invoice_byClient = (data) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_INVOICE_BYCLIENT_REQUEST })
        return await axios
            .get(`${baseUrl}/invoice/show/facture/client/${data}`)
            .then(async (res) => {
                dispatch({
                    type: SHOW_INVOICE_BYCLIENT_SUCCESS,
                    payload: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: SHOW_INVOICE_BYCLIENT_FAIL,
                    payload: err,
                })
            })
    }
}


export const Show_devis_byClient = (data) => {
    return async (dispatch) => {
        dispatch({ type: SHOW_DEVIS_BY_CLIENT_REQUEST });
        try {
            const response = await axios.get(`${baseUrl}/devis/show/client/${data}`);
            dispatch({
                type: SHOW_DEVIS_BY_CLIENT_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: SHOW_DEVIS_BY_CLIENT_FAIL,
                payload: error,
            });
        }
    };
};


