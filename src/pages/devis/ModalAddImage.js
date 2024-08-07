import React, { useState, useEffect } from 'react'
import { Button, Modal, Container, Col, Row, FormControl, Alert } from 'react-bootstrap'

function ModalAddImage({ ...props }) {


    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={props?.onHide}
            backdrop="static"
        >
            <Modal.Header >
                <Modal.Title>Image </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Container style={{ width: "fit-content" }} >
                    <h2>Voulez vous ajouter cette Image comme un logo pour votre entreprise</h2>

                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={() => {
                    props?.onAddimage()
                    props?.onHide()
                }}
                >Valider</Button>
                <Button variant='outline-danger' onClick={() => {
                    props?.onHide()
                }} >Close</Button>
            </Modal.Footer>
        </Modal >
    )
}
export default ModalAddImage