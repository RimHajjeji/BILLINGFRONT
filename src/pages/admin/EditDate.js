import React from 'react'
import { Modal, Button } from 'react-bootstrap'
function EditDate({ show, handleClose, onSubmit, ...props }) {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered
            keyboard={false}
        >
            <Modal.Header >
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Voulez vous modifier la date d'abonnement
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={onSubmit}>Valider</Button>
                <Button variant="outline-danger" onClick={handleClose}>
                    Annuler
                </Button>

            </Modal.Footer>
        </Modal>
    )
}
export default EditDate