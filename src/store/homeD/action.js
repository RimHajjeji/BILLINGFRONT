import { CALANDER_FAIL, CALANDER_REQUEST, CALANDER_SUCCESS, ETAT_DEVIS_FAIL, ETAT_DEVIS_REQUEST, ETAT_DEVIS_SUCCESS } from './constant'
import axios from 'axios'
import { baseUrl } from '../../config/base'

import { Show_devis_byClient } from '../client/action';

export const HomeD = (data) => {
    return (dispatch) => {
        dispatch({ type: CALANDER_REQUEST })
        return axios
            .get(`${baseUrl}/devis/show/price/devis/${data}`)
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


export const Upd_etat_devis = (iddevis, data, id = null) => {
    const obj = {
        etats: data
    }
    console.log('data is dgfffd', iddevis, obj)
    return (dispatch) => {

        dispatch({ type: ETAT_DEVIS_REQUEST })
        axios.put(`${baseUrl}/devis/etats/upd/${iddevis}`, obj)
            .then(async (res) => {
                dispatch({
                    type: ETAT_DEVIS_SUCCESS,
                    payload: res.data,
                })

                if (id !== null) {
                    await dispatch(Show_devis_byClient(id))
                    await dispatch(HomeD(id))
                }


            })
            .catch((err) => {
                dispatch({
                    type: ETAT_DEVIS_FAIL,
                    payload: err,
                })
            })
    }

}