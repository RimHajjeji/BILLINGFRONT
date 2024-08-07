import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BiHide } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

function ClientDevisInfo({ dataFilter, ClientObjectExport, ...props }) {
    const [addingInput, setAddingInput] = useState([]);
    const [delteElement, setDeletedElement] = useState([]);
    const [idInput, setIdInput] = useState(null);

    const eliminateId = () => {
        setAddingInput(addingInput.filter(el => el?.id !== idInput));
    };

    const hideElement = (key, value) => {
        if (delteElement?.filter(el => el?.value === value)[0]?.key !== undefined) {
            ClientObjectExport(prev => ({ ...prev, [key]: value }));
            setDeletedElement(prev => prev.filter(el => el?.value !== value));
        } else {
            ClientObjectExport(prev => ({ ...prev, [key]: undefined }));
            setDeletedElement(prev => [...prev, { key: key, value: value }]);
        }
    };

    return (
        <Container>
            <Row style={{ marginTop: '10px' }}>
                <Col sm={2}>Entreprise:</Col>
                <Col style={{ marginLeft: '25px' }} sm={2}>{dataFilter?.raison_sociale}</Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col sm={2}>Matricule fiscal:</Col>
                <Col style={{ marginLeft: '25px' }} sm={2}>{dataFilter?.mf}</Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col sm={2} style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.email)[0]?.key !== undefined ? '0.6' : '1' }}>Email:</Col>
                <Col style={{ marginLeft: '25px', opacity: delteElement?.filter(el => el?.value === dataFilter?.email)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>{dataFilter?.email}</Col>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.email)[0]?.key !== undefined ? '0.6' : '1' }} onClick={() => hideElement('email', dataFilter?.email)} sm={{ offset: 2 }}><BiHide /></Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col sm={2} style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.respensable)[0]?.key !== undefined ? '0.6' : '1' }}>Responsable:</Col>
                <Col style={{ marginLeft: '25px', opacity: delteElement?.filter(el => el?.value === dataFilter?.respensable)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>{dataFilter?.respensable}</Col>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.respensable)[0]?.key !== undefined ? '0.6' : '1' }} onClick={() => hideElement('respensable', dataFilter?.respensable)} sm={{ offset: 2 }}><BiHide /></Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.tle)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>Numéro mobile:</Col>
                <Col style={{ marginLeft: '25px', opacity: delteElement?.filter(el => el?.value === dataFilter?.tle)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>{dataFilter?.tle}</Col>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.tle)[0]?.key !== undefined ? '0.6' : '1' }} onClick={() => hideElement('tle', dataFilter?.tle)} sm={{ offset: 2 }}><BiHide /></Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.fax)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>Fax:</Col>
                <Col style={{ marginLeft: '25px', opacity: delteElement?.filter(el => el?.value === dataFilter?.fax)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>{dataFilter?.fax}</Col>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.fax)[0]?.key !== undefined ? '0.6' : '1' }} onClick={() => hideElement('fax', dataFilter?.fax)} sm={{ offset: 2 }}><BiHide /></Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.address)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>Adresse:</Col>
                <Col style={{ marginLeft: '25px', opacity: delteElement?.filter(el => el?.value === dataFilter?.address)[0]?.key !== undefined ? '0.6' : '1' }} sm={2}>{dataFilter?.address}</Col>
                <Col style={{ opacity: delteElement?.filter(el => el?.value === dataFilter?.address)[0]?.key !== undefined ? '0.6' : '1' }} onClick={() => hideElement('address', dataFilter?.address)} sm={{ offset: 2 }}><BiHide /></Col>
            </Row>
        </Container>
    );
}

export default ClientDevisInfo;
