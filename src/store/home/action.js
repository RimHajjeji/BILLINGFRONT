import { CALANDER_FAIL, CALANDER_REQUEST, CALANDER_SUCCESS, ETAT_INVOICE_FAIL, ETAT_INVOICE_REQUEST, ETAT_INVOICE_SUCCESS } from './constant'
import axios from 'axios'
import { baseUrl } from '../../config/base'
import { Show_invoice_byClient } from '../client/action'

export const Home = (data) => {
    return (dispatch) => {
        dispatch({ type: CALANDER_REQUEST })
        return axios
            .get(`${baseUrl}/invoice/show/price/facture/${data}`)
            .then((res) => {
                dispatch({
                    type: CALANDER_SUCCESS,
                    payload: res.data,
                })
            })
            .catch((err) => {
                dispatch({
                    type: CALANDER_FAIL,
                    payload: err,
                })
            })
    }
}


export const Upd_etat_invoice = (idinvoice, data, id = null) => {
    const obj = {
        etats: data
    }
    console.log('data is dgfffd', idinvoice, obj)
    return (dispatch) => {

        dispatch({ type: ETAT_INVOICE_REQUEST })
        axios.put(`${baseUrl}/invoice/etats/upd/${idinvoice}`, obj)
            .then(async (res) => {
                dispatch({
                    type: ETAT_INVOICE_SUCCESS,
                    payload: res.data,
                })

                if (id !== null) {
                    await dispatch(Show_invoice_byClient(id))
                    await dispatch(Home(id))
                }


            })
            .catch((err) => {
                dispatch({
                    type: ETAT_INVOICE_FAIL,
                    payload: err,
                })
            })
    }

}