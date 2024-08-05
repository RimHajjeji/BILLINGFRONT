import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { Add_material } from '../../store/material/action';
import { MdOutlineModeEdit } from "react-icons/md";
import validator from 'validator';
import '../../styles/user/UserProfile.css'
import { UpdUser } from '../../store/user/actionUser/action';
import { ChangePassword } from '../../store/user/changePass/action';
function Changepass(props) {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.LoginUser?.data?.new)
    const errs = useSelector(state => state?.ChangePassword?.data)
    const [currentPass, setCurrentPass] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    const data_user = {
        currentPass: currentPass,
        password: password,

    }


    //validation state
    const [validated, setValidated] = useState(false);
    const [currentPasserror, setCurrentPasserror] = useState("");
    const [passerror, setPasserror] = useState("");
    const [pass2error, setPass2error] = useState("");
    const [count2, setCount2] = useState(0);


    const valid = () => {
        let count = 0;

        /*   if (count2 === 1) {
              count++;
              setCurrentPasserror("Mot de passe incorrect! ");
          } */


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



        if ((confPassword != password) || (!confPassword)) {
            count++;
            setPass2error("Mot de passe incorrect ");
        }

        if (count > 0) {
            setValidated(false);
            return false;
        }
        return true;
    };



    const close = () => {
        setCurrentPass('')
        setPassword('')
        setCurrentPasserror('')
        setPasserror('')
        setPass2error('')
        setConfPassword('')
        props.onHide()

    }

    useEffect(() => {
        if (errs?.msg === 'change pass err') {
            setCurrentPasserror("Mot de passe incorrect! ")

        } else if (errs === 'utilisatuer pass updated') {
            close();
        }
    }, [errs])

    console.log('msg', errs?.msg)

    const onsubmite = async () => {
        const isValid = valid();
        if (isValid) {
            dispatch(ChangePassword(user?._id, data_user))
        }
    };

    return (
        <Modal
            show={props?.show}
            onHide={props?.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/*   <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header> */}
            <Modal.Body>

                <div className="signup-formUS">
                    <Form validated={validated}>
                        <h2>MODIFIER MOT DE PASSE</h2>
                        <div className="form-group">
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Courant mot de passe <MdOutlineModeEdit /></label>
                            <InputGroup hasValidation>
                                <Form.Control type="password" className="inputUS form-control" name="nom" placeholder="Courant mot de passe" required="required" isInvalid={currentPasserror} value={currentPass} onChange={(e) => { setCurrentPass(e.target.value); setCurrentPasserror('') }} />
                                <Form.Control.Feedback type="invalid">
                                    {currentPasserror}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Nouvelle mot de passe<MdOutlineModeEdit /></label>
                            <InputGroup hasValidation>
                                <Form.Control type="password" className="inputUS form-control" name="password" placeholder="Nouvelle mot de passe*" required="required" isInvalid={passerror} value={password} onChange={(e) => { setPassword(e.target.value); setPasserror('') }} />
                                <Form.Control.Feedback type="invalid">
                                    {passerror}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Configurer mot de passe <MdOutlineModeEdit /></label>
                            <InputGroup hasValidation>
                                <Form.Control type="password" className="inputUS form-control" name="password" placeholder="Confirm Mot de passe* "/*  required="required" */ isInvalid={pass2error} value={confPassword} onChange={(e) => { setConfPassword(e.target.value); setPass2error('') }} />
                                <Form.Control.Feedback type="invalid">
                                    {pass2error}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>

                    </Form>
                </div>

            </Modal.Body >
            <Modal.Footer>
                <Button onClick={onsubmite} variant="outline-success" type="submit">Modifier</Button>
                <Button variant="outline-danger" onClick={close}>Fermer</Button>


            </Modal.Footer>
        </Modal >
    );
}

export default Changepass