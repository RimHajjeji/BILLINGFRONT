import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { Add_material } from '../../store/material/action';
import { MdOutlineModeEdit } from "react-icons/md";
import validator from 'validator';
import '../../styles/user/UserProfile.css'
import { UpdUser } from '../../store/user/actionUser/action';
function UserProfile(props) {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.LoginUser?.data?.new)

    const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [tle, setTle] = useState('')
    const [email, setEmail] = useState('')
    const data_user = {
        nom: nom,
        prenom: prenom,
        email: email,
        tle: tle,
    }
    useEffect(() => {
        setNom(user?.nom)
        setPrenom(user?.prenom)
        setTle(user?.tle)
        setEmail(user?.email)
    }, [user?._id])
    console.log('poddf', props.onHide)

    //validation state
    const [validated, setValidated] = useState(false);
    const [nomerror, setNomerror] = useState("");
    const [prenomerror, setPrenomerror] = useState("");
    const [emailerror, setEmailerror] = useState("");
    const [tleerror, setTleerror] = useState("");

    const valid = () => {
        let count = 0;


        if (!prenom) {
            count++;
            setPrenomerror("Remplir le prenom SVP! ");
        }
        if (!nom) {
            count++;
            setNomerror("Remplir le nom SVP! ");
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

    /* const close = () => {
        props.onHide()
        setRaison_socialeerror('')
        setMferror('')
        setTleerror('')
        setEmailerror('')
        setRiberror('')
        setRespensableerror('')
 
 
    } */

    const close = () => {
        props.onHide()
        setPrenomerror('')
        setNomerror('')
        setTleerror('')
        setEmailerror('')

    }

    const onsubmite = async () => {
        const isValid = valid();
        if (isValid) {
            dispatch(UpdUser(user?._id, data_user, user?._id))
            close()

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
                        <h2>MODIFIER PROFILE</h2>
                        <div className="form-group">
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Non <MdOutlineModeEdit /></label>
                            <InputGroup hasValidation>
                                <Form.Control type="text" className="inputUS form-control" name="nom" placeholder="NOM" required="required" isInvalid={nomerror} value={nom} onChange={(e) => { setNom(e.target.value); setNomerror('') }} />
                                <Form.Control.Feedback type="invalid">
                                    {nomerror}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Prenom <MdOutlineModeEdit /></label>
                            <InputGroup hasValidation>
                                <Form.Control type="text" className="inputUS form-control" name="prenom" placeholder="PRENOM" required="required" isInvalid={prenomerror} value={prenom} onChange={(e) => { setPrenom(e.target.value); setPrenomerror('') }} />
                                <Form.Control.Feedback type="invalid">
                                    {prenomerror}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Email<MdOutlineModeEdit /></label>
                            <InputGroup hasValidation>
                                <Form.Control type="email" className="inputUS form-control" name="email" placeholder="Email" required="required" isInvalid={emailerror} value={email} onChange={(e) => { setEmail(e.target.value); setEmailerror('') }} />
                                <Form.Control.Feedback type="invalid">
                                    {emailerror}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Telephone <MdOutlineModeEdit /></label>
                            <InputGroup hasValidation>
                                <Form.Control type="text" className="inputUS form-control" name="Telephone" placeholder="Telephone" required="required" isInvalid={tleerror} value={tle} onChange={(e) => { setTle(e.target.value); setTleerror('') }} />
                                <Form.Control.Feedback type="invalid">
                                    {tleerror}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>

                    </Form>
                </div>

            </Modal.Body >
            <Modal.Footer>
                <Button onClick={onsubmite} variant="outline-success" type="submit">Modifier</Button>
                <Button variant="outline-danger" onClick={props.onHide}>Fermer</Button>


            </Modal.Footer>
        </Modal >
    );
}
export default UserProfile







