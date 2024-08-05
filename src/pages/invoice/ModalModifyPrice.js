import React, { useState, useEffect } from 'react'
import { Button, Modal, Container, Col, Row, FormControl, Alert } from 'react-bootstrap'
function ModalModifyPrice({ selectedMateriel, changePrice, ...props }) {

    const [priceValue, setPriceValue] = useState(0)
    const [MaterielAmounts, setMaterielAmount] = useState(selectedMateriel?.amount)
    const [showAlertAmount, setShowAlertAmount] = useState(false)
    useEffect(() => {
        if (selectedMateriel?._id !== undefined)
            setPriceValue(selectedMateriel?.prix)
    }, [selectedMateriel])

    useEffect(() => {
        if (showAlertAmount === true) {
            setTimeout(() => {
                setShowAlertAmount(false)
            }, 2000)
        }
    }, [showAlertAmount])
    console.log('selected materie', selectedMateriel)
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
                <Modal.Title>Modifier prix</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Container style={{ width: "fit-content" }} >
                    <Row >
                        <Col sm={6}>
                            <FormControl
                                style={{ height: '40px' }}
                                type="Number"
                                value={priceValue}
                                onChange={(e) => {

                                    setPriceValue(e.target.value)





                                }}
                            />
                        </Col>

                    </Row>
                    <Row style={{ margin: '10px' }}>
                        <Col sm="12">
                            {showAlertAmount &&
                                (<Alert variant="danger" >
                                    <Alert.Heading>Attention!</Alert.Heading>
                                    <p>
                                        Le prix est invalide
                                    </p>
                                </Alert>)}
                        </Col>

                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-success' onClick={() => {
                    if (priceValue > 0)
                        changePrice(selectedMateriel?._id, priceValue)
                    else
                        setShowAlertAmount(true)
                }
                }>Valider</Button>
                <Button variant='outline-danger' onClick={() => props?.onHide()}>Close</Button>
            </Modal.Footer>
        </Modal >
    )
}
export default ModalModifyPrice