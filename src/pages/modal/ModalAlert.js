import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import React from 'react'

function ModalAlert({ header, body, show, btnClicked, handleClose, valider, variants, ...props }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{header} </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant={variants} onClick={btnClicked}>
          {valider}
        </Button>
        {/*    <Button variant="outline-danger" onClick={handleClose}>
          Annuler
        </Button> */}

      </Modal.Footer>
    </Modal>
  )
}

export default ModalAlert