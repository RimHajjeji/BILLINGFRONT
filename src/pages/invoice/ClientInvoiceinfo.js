import React, { useState, useEffect } from 'react'
import { Container, Row, Col, FormControl, Button } from 'react-bootstrap'
import { BiHide } from 'react-icons/bi'

import { MdDeleteOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';
import { Show_client_byCompany } from '../../store/client/action';
function ClientInvoiceinfo({ dataFilter, ClientObjectExport, ...props }) {
    const [addingInput, setAddingInput] = useState([])
    const [delteElement, setDeletedElement] = useState([])
    const [idInput, setIdInput] = useState(null)
    const elimanateId = () => {
        setAddingInput(addingInput.filter(el => el?.id !== idInput))
    }
    const hideElement = (key, value) => {
        if (delteElement?.filter(el => el?.value === value)[0]?.key !== undefined) {
            ClientObjectExport(prev => ({ ...prev, [key]: value }))
            setDeletedElement(prev => (prev?.filter(el => el?.value !== value)))
        }
        else {
            ClientObjectExport(prev => ({ ...prev, [key]: undefined }))
            setDeletedElement(prev => ([...prev, { key: key, value: value }]))

        }
    }
    console.log("refref", '||||', dataFilter, '||||', delteElement, '|||')
    return (
        <Container >
            <Row style={{ marginTop: '10px' }}>
                <Col sm={2} >
                    Entreprise:
                </Col>
                <Col style={{ marginLeft: '25px' }} sm={2}>
                    {dataFilter?.raison_sociale}
                </Col>
                {/* <Col sm={{ offset: 2 }}>
                    <BiHide />
                </Col> */}
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col sm={2}>
                    Matricule fiscal:
                </Col>
                <Col style={{ marginLeft: '25px' }} sm={2}>
                    {dataFilter?.mf}
                </Col>
                {/*  <Col sm={{ offset: 2 }}>
                    <BiHide />
                </Col> */}
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col sm={2} style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.email)[0]?.key !== undefined ? '0.6' : '1' }}>
                    Email:
                </Col>
                <Col style={{ marginLeft: '25px', opacity: delteElement?.filter(el => el?.value === dataFilter?.email)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>
                    {dataFilter?.email}
                </Col>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.email)[0]?.key !== undefined ? '0.6' : '1' }} onClick={() => {
                    hideElement('email', dataFilter?.email)
                }} sm={{ offset: 2 }} >
                    <BiHide />
                </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col sm={2} style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.respensable)[0]?.key !== undefined ? '0.6' : '1' }}>
                    Responsable:
                </Col>
                <Col style={{ marginLeft: '25px', opacity: delteElement?.filter(el => el?.value === dataFilter?.respensable)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>
                    {dataFilter?.respensable}
                </Col>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.respensable)[0]?.key !== undefined ? '0.6' : '1' }} onClick={() => {
                    hideElement('respensable', dataFilter?.respensable)
                }} sm={{ offset: 2 }}>
                    <BiHide />
                </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.tle)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>
                    Numéro mobile:
                </Col>
                <Col style={{ marginLeft: '25px', opacity: delteElement?.filter(el => el?.value === dataFilter?.tle)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>
                    {dataFilter?.tle}
                </Col>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.tle)[0]?.key !== undefined ? '0.6' : '1' }} onClick={() => {
                    hideElement('tle', dataFilter?.tle)
                }} sm={{ offset: 2 }}>
                    <BiHide />
                </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.fax)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>
                    Fax:
                </Col>
                <Col style={{ marginLeft: '25px', opacity: delteElement?.filter(el => el?.value === dataFilter?.fax)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>
                    {dataFilter?.fax}
                </Col>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.fax)[0]?.key !== undefined ? '0.6' : '1' }} onClick={() => {
                    hideElement('fax', dataFilter?.fax)
                }} sm={{ offset: 2 }}>
                    <BiHide />
                </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.address)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>
                    Adresse:
                </Col>
                <Col style={{ marginLeft: '25px', opacity: delteElement?.filter(el => el?.value === dataFilter?.address)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>
                    {dataFilter?.address}
                </Col>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.address)[0]?.key !== undefined ? '0.6' : '1' }} onClick={() => {
                    hideElement('address', dataFilter?.address)
                }} sm={{ offset: 2 }}>
                    <BiHide />
                </Col>
            </Row>
            {/*  <Row>
                <Row>
                    {addingInput?.length > 0 &&
                        addingInput?.map((el) => {
                            return (
                                <Row key={el?.id} style={{ marginBottom: '10px' }}>
                                    <Col sm={2}>
                                        <FormControl
                                            style={{ height: "30px" }}
                                            type="text"
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <FormControl
                                            style={{ height: "30px" }}
                                            type="text"
                                        />
                                    </Col>
                                    <Col style={{ cursor: 'pointer' }} onMouseOver={() => {
                                        setIdInput(el.id)
                                    }} onClick={() => {
                                        elimanateId()
                                    }} sm={2}>
                                        <MdDeleteOutline style={{ fontSize: "1.5rem" }} />
                                    </Col>
                                </Row>
                            )
                        })

                    }
                </Row>
                <Col onClick={() => {
                    setAddingInput([...addingInput, { id: Math.floor(Math.random() * 100) }])
                }} style={{ marginTop: '25px', cursor: 'pointer' }} sm={{ offset: 3 }}>
                    <Button variant='outline-primary'>Ajouter un champ</Button>
                </Col>
            </Row> */}
        </Container>
    )
}
export default ClientInvoiceinfo