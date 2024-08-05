import React, { useState } from 'react'
import '../../styles/Auth/RegisterClient.css'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineModeEdit } from "react-icons/md";
import validator from 'validator';
import { Alert, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { RegisterAdmin } from '../../store/admin/action'

function Addadmin() {
    const dispatch = useDispatch()
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [tle, setTle] = useState('')
    const [date, setDate] = useState(new Date().toISOString())
    const data_Admin = {
        user: {
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
            tle: tle,
            role: 0,
            abon: 'null',
            etats: 'true',
        }

    }

    //validation state
    const [validated, setValidated] = useState(false);
    const [nomerror, setNomerror] = useState("");
    const [prenomerror, setPrenomerror] = useState("");
    const [emailerror, setEmailerror] = useState("");
    const [passerror, setPasserror] = useState("");
    const [pass2error, setPass2error] = useState("");
    const [tleerror, setTleerror] = useState("");
    const [showAlertSucess, SetShowAlertSuccess] = useState(false)


    const valid = () => {
        let count = 0;


        if (!prenom) {
            count++;
            setPrenomerror("Remplir le prenom SVP! ");
        } else if (prenom.length < 3) {
            count++;
            setPrenomerror("Le prenom doit être au moins 4 caractères! ");
        }
        if (!nom) {
            count++;
            setNomerror("Remplir le nom SVP! ");
        } else if (nom.length < 3) {
            count++;
            setNomerror("Le nom doit être au moins 4 caractères! ");
        }

        if (!password) {
            count++;
            setPasserror("Remplir mot de passe SVP! ");
        } else if (password.length < 8) {
            count++;
            setPasserror("Au minimum 8 caractères! ");
        } /* else if (!(validator.isStrongPassword(password))) {
            count++;
            setPasserror("N'est pas un mot de passe fort! ");
        } */



        if (confPassword != password) {
            count++;
            setPass2error("Mot de passe incorrect ");
        }

        if (!tle) {
            count++;
            setTleerror("Remplir le Numero de telephone SVP ");
        }
        if (tle.length > 8 || tle.length < 8) {
            count++;
            setTleerror("Numero de telephone incorrect ");
        } else if (!(validator.isMobilePhone(tle))) {
            count++;
            setTleerror("Entrez un numéro de téléphone valide!");
        }

        if (!email) {
            count++;
            setEmailerror("L'email du client doit étre remplir ");

        } else if (!(validator.isEmail(email))) {
            count++;
            setEmailerror("Entrez une adresse email valide!");
        }

        if (count > 0) {
            setValidated(false);
            return false;
        }
        return true;
    };

    const ajouter = async () => {
        const isValid = valid();
        if (isValid) {
            dispatch(RegisterAdmin(data_Admin, SetShowAlertSuccess))

        }
    };




    return (
        <Container className='containerCM'>
            <Row style={{ textAlign: 'center' }}>
                <Col><h2>AJOUTER ADMIN</h2></Col>
            </Row>
            <Row>
                <Form validated={validated}>
                    <Form.Group className=" mb-3" >
                        <InputGroup hasValidation>
                            <Form.Control type="text" className='height' name="nom" placeholder="Nom*" required="required" isInvalid={nomerror} value={nom} onChange={(e) => { setNom(e.target.value); setNomerror('') }} />
                            <Form.Control.Feedback type="invalid">
                                {nomerror}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className=" mb-3" >
                        <InputGroup hasValidation>
                            <Form.Control type="text" className="height" name="prenom" placeholder="Prenom*" required="required" isInvalid={prenomerror} value={prenom} onChange={(e) => { setPrenom(e.target.value); setPrenomerror('') }} />
                            <Form.Control.Feedback type="invalid">
                                {prenomerror}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className=" mb-3" >
                        <InputGroup hasValidation>
                            <Form.Control type="email" className="height" name="email" placeholder="Email*" required="required" isInvalid={emailerror} value={email} onChange={(e) => { setEmail(e.target.value); setEmailerror('') }} />
                            <Form.Control.Feedback type="invalid">
                                {emailerror}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className=" mb-3" >
                        <InputGroup hasValidation>
                            <Form.Control type="text" className="height" name="tle" placeholder="Numéro de téléphone* " required="required" isInvalid={tleerror} value={tle} onChange={(e) => { setTle(e.target.value); setTleerror('') }} />
                            <Form.Control.Feedback type="invalid">
                                {tleerror}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className=" mb-3" >
                        <InputGroup hasValidation>
                            <Form.Control type="password" className="height" name="password" placeholder="Mot de passe*" required="required" isInvalid={passerror} value={password} onChange={(e) => { setPassword(e.target.value); setPasserror('') }} />
                            <Form.Control.Feedback type="invalid">
                                {passerror}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className=" mb-3" >
                        <InputGroup hasValidation>
                            <Form.Control type="password" className="height" name="password" placeholder="Confirm Mot de passe* "/*  required="required" */ isInvalid={pass2error} value={confPassword} onChange={(e) => { setConfPassword(e.target.value); setPass2error('') }} />
                            <Form.Control.Feedback type="invalid">
                                {pass2error}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>



                </Form>

            </Row>
            <Row className='margin' >
                <Col md={{ span: 4, offset: 10 }}>
                    <Button onClick={ajouter} variant="outline-success" type="submit">Ajouter</Button>
                </Col>

            </Row>
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


        </Container>
    )
}

export default Addadmin