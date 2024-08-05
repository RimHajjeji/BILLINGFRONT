import React, { useEffect, useRef, useState } from 'react'
import { Form, Container, Row, Button, Col, ToastContainer, Toast } from 'react-bootstrap'
import { AiOutlineUserAdd } from 'react-icons/ai'
import ClientRegistre from '../client/ClientRegistre'
import { FiUsers } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Show_client_byCompany } from '../../store/client/action'
import ClientInvoiceinfo from './ClientInvoiceinfo'
function AddClientInvoice({ setClientObject, setObjectForExport, ...props }) {
    const ref = useRef()

    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false)
    const [client, setClient] = useState('')
    const [filtredClient, setFiltredClient] = React.useState([])
    const [ShowToast, setShowToast] = useState(false)
    const [selectedClient, setSelectedClient] = useState({})
    const clients = useSelector(state => state?.Show_client_byCompany?.data)
    const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
    useEffect(() => {
        dispatch(Show_client_byCompany(Idcopany))
    }, [Idcopany])
    useEffect(() => {
        if (client?.length > 0) {
            setFiltredClient(clients?.filter((el) => {
                return String(el?.raison_sociale)?.includes(String(client)) === true
            }))
        }
        else {

            setFiltredClient(clients)
        }

    }, [clients, client])
    useEffect(() => {
        setObjectForExport(filtredClient)
    }, [filtredClient])
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowToast(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref])
    console.log('sqddqs', Object?.keys(selectedClient)?.map((el, index) => {
        return el
    }))
    return (
        <Form>
            <Container>
                <Row>
                    <h3>Client</h3>
                    <Col md={6}>
                        <Form.Control style={{ height: '38px' }} value={client} onClick={() => {
                            setShowToast(true)
                            setSelectedClient({})
                        }} onChange={(e) => setClient(e.target.value)} type="text" />
                        <ToastContainer className="p-3">
                            <Toast ref={ref} show={ShowToast} onClose={client?.length === 0}>
                                <Toast.Header closeButton={false}>
                                    <FiUsers style={{ fontSize: '2rem' }} />
                                    <strong className="me-auto"></strong>
                                    <strong>Clients</strong>
                                </Toast.Header>
                                <Toast.Body style={{ cursor: 'pointer' }}>
                                    {filtredClient?.length > 0 && filtredClient?.map(el => {
                                        if (el?.isdeleted === false || el?.isdeleted === undefined)
                                            return (<>
                                                <p onClick={() => {
                                                    setShowToast(false)
                                                    setSelectedClient(el)
                                                    setClientObject(el)
                                                    setObjectForExport(el)
                                                }} key={el._id}>{el?.raison_sociale}</p>
                                                <hr />
                                            </>)

                                    })}
                                </Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </Col>

                    <Col md={2}>
                        <Button variant="outline-primary" onClick={() => setModalShow(true)}><AiOutlineUserAdd /></Button>
                    </Col>
                </Row>
                {selectedClient?._id !== undefined &&
                    (<Row>
                        <hr style={{ width: '500px' }}></hr>
                        <ClientInvoiceinfo
                            dataFilter={selectedClient}
                            ClientObjectExport={setObjectForExport}
                        />

                    </Row>)
                }
                <ClientRegistre
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Container>
        </Form>
    )
}

export default AddClientInvoice