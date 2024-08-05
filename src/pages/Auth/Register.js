import React, { useEffect, useState } from 'react'
import RegisterClient from "./RegisterUser"
import RegisterCompany from "./RegisterCompany"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { RegisterUser } from '../../store/user/registre/user/action';
import Login from './Login';

import { Alert, Row, Col } from 'react-bootstrap'
function Register() {
    const dispatch = useDispatch()
    const history = useHistory()
    const Idcomp = useSelector(state => state?.RegiSCompany?.data?._id)
    const IdUser = useSelector(state => state?.RegisterUser?.data?.user)
    const [company, setCompany] = useState(false)
    const [client, setClient] = useState(true)
    const [count, setCount] = useState(0)

    const [showAlertSucess, SetShowAlertSuccess] = useState(false)
    const [log, setLog] = useState(false)
    const [values, setValues] = useState({})
    const changeTocompany = () => {
        setClient(false)
        setCompany(true)
        setCount(1)
    }
    const changeToClient = () => {
        setClient(true)
        setCompany(false)
    }
    const addUserAccount = () => {
        dispatch(RegisterUser(values, SetShowAlertSuccess, history))
        /* setLog(true) */
        setTimeout(() => {
            SetShowAlertSuccess(false)
        }, (4000))
        console.log('valuesscis', values)
    }
    useEffect(() => {
        if (values?.user?.email !== undefined && values?.company !== undefined) {
            addUserAccount()

        }
    }, [values])
    useEffect(() => {
        if (!!IdUser) {
            setCompany(true)
            setClient(false)
        }
    }, [IdUser])

    useEffect(() => {
        if (!!Idcomp) {
            setLog(true)
        }
    }, [Idcomp])
    console.log('logs of values ====', values)
    return (
        <div>

            {client === true && (
                <RegisterClient change={changeTocompany} setCount={setCount} setvalues={setValues} count={count} />
            )}
            {
                company === true && (
                    <RegisterCompany change2={changeToClient} setCount={setCount} setvalues={setValues} createAccount={addUserAccount} />
                )
            }
            {/*  {
                log === true && (
                    <Login change3={setLog} />
                )
            } */}
            {showAlertSucess &&
                (<Row style={{ position: 'absolute', right: '0', margin: '20px', zIndex: "444", width: '500px' }}>
                    <Col lg={12}>
                        <Alert variant="success" >
                            <Alert.Heading>Success!</Alert.Heading>
                            <p>
                                Vous ête enregistrer avec succeer
                            </p>
                        </Alert>
                    </Col>
                </Row>)}

        </div>
    )
}

export default Register
