import React, { useState } from 'react'
import { Button, Col, FormControl, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Upd_abon_user } from '../../store/user/actionUser/action';


function Abon({ element, ...props }) {
    const dispatch = useDispatch();
    const [updShow, setUpdShow] = React.useState(false);
    const company = useSelector(state => state?.Show_All_company?.data)
    const [valide, setValide] = useState(false);
    const [abonerror, setAbonerror] = useState('');
    const [dabn, setDabn] = useState(null);
    const [fabn, setFabn] = useState(null);

    const valid = () => {
        let count = 0;

        if (dabn > fabn) {
            count++;
            setAbonerror("Le date de debut est incorrect");
        }

        if (count > 0) {
            setValide(false);
            return false;
        }
        return true;
    };

    const changeDateAbbon = () => {
        const isValid = valid();
        if (isValid) {
            dispatch(Upd_abon_user(element?.userId?._id, {
                abon: dabn,
                fabon: fabn

            }
            ))
            setAbonerror('')
            props.onHide()

        }

    }
    return (
        <Modal
            {...props}
            size="sm"
            backdrop="static"
            centered
        >
            <Modal.Header >
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row >
                    <h4 style={{ textAlign: 'center', marginBottom: '30px' }}> Debut d'abonnement </h4>

                    <Col>

                    </Col>

                    <Col>
                        <FormControl
                            type="date"
                            style={{ height: '30px', width: '18vh', alignSelf: 'center' }}
                            value={dabn !== null ? dabn : element?.userId?.abon}
                            onChange={(e) => { setDabn(e.target.value) }}
                        />
                    </Col>

                    <Col>

                    </Col>

                </Row>

                <Row >
                    <h4 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '30px' }}>Fin d'abonnement</h4>
                    <Col>

                    </Col>

                    <Col>
                        <FormControl
                            type="date"
                            style={{ height: '30px', width: '18vh', alignSelf: 'center' }}
                            value={fabn !== null ? fabn : element?.userId?.fabon}
                            onChange={(e) => { setFabn(e.target.value) }}

                        />
                    </Col>

                    <Col>

                    </Col>
                </Row>

                <div style={{ textAlign: 'center', color: "red", marginTop: '30px' }}>{abonerror}</div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={changeDateAbbon} >Valider</Button>
                <Button variant="outline-danger" onClick={() => {
                    props.onHide()
                    setAbonerror('')
                }}>
                    Annuler
                </Button>

            </Modal.Footer>
        </Modal >
    )
}

export default Abon