import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import validator from 'validator';
import { useSelector, useDispatch } from "react-redux";
import { Add_client, Show_client_byCompany } from '../../store/client/action';
import { Add_service } from '../../store/service/action'
import '../../styles/client/ClientRegistre.css'
function ClientRegistre(props) {
    const dispatch = useDispatch()
    const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
    const [respensable, setRespensable] = useState('')
    const [raison_sociale, setRaison_sociale] = useState('')
    const [mf, setMf] = useState('')
    const [tle, setTle] = useState('')
    const [fax, setFax] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [rib, setRib] = useState('')
    const data_client = {
        companyId: Idcopany,
        respensable: respensable,
        raison_sociale: raison_sociale,
        mf: mf,
        tle: tle,
        fax: fax,
        email: email,
        rib: rib,
        address: address,
    }

    //validation state
    const [validated, setValidated] = useState(false);
    const [raison_socialeerror, setRaison_socialeerror] = useState("");
    const [mferror, setMferror] = useState("");
    const [tleerror, setTleerror] = useState("");
    const [respensableerror, setRespensableerror] = useState("");
    const [emailerror, setEmailerror] = useState("");
    const [riberror, setRiberror] = useState("");

    const valid = () => {
        let count = 0;


        if (!raison_sociale) {
            count++;
            setRaison_socialeerror("Inserer le Raison socialeerror de cette client SVP ");
        }
        if (!respensable) {
            count++;
            setRespensableerror("Remplir le respensable de telephone SVP ");
        }
        if (!mf) {
            count++;
            setMferror("Inserer une Matricule Fiscal pour cette client SVP ");
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
        if (!rib) {
            count++;
            setRiberror("Le rib du client doit étre remplir ");
        }
        if (count > 0) {
            setValidated(false);
            return false;
        }
        return true;
    };

    const close = () => {
        props.onHide()
        setRaison_socialeerror('')
        setMferror('')
        setTleerror('')
        setEmailerror('')
        setRiberror('')
        setRespensableerror('')


    }
    const onSubmit = async () => {
        const isValid = valid();
        if (isValid) {
            dispatch(Add_client(data_client, Idcopany))
            close()
        }
    };

    useEffect(() => {
        dispatch(Show_client_byCompany(Idcopany))
    }, [Idcopany])

    return (
        <Modal
            {...props}
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

                <div className="signup-formS">
                    <Form validated={validated}>
                        <h2>AJOUTER CLIENT</h2>
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" className="inputS form-control" isInvalid={raison_socialeerror} name="nom" placeholder="Raison Sociale*" required="required" value={raison_sociale} onChange={(e) => { setRaison_sociale(e.target.value); setRaison_socialeerror('') }} />
                                        <Form.Control.Feedback type="invalid">
                                            {raison_socialeerror}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </div>
                                <div className="col">
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" className="inputS form-control" isInvalid={respensableerror} name="nom" placeholder="Respensable*" required="required" value={respensable} onChange={(e) => { setRespensable(e.target.value); setRespensableerror('') }} />
                                        <Form.Control.Feedback type="invalid">
                                            {respensableerror}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </div>
                                <div className="col">
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" className="inputS form-control" isInvalid={tleerror} name="ref_cons" placeholder="Telephone*" required="required" value={tle} onChange={(e) => { setTle(e.target.value); setTleerror('') }} />
                                        <Form.Control.Feedback type="invalid">
                                            {tleerror}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </div>

                            </div>



                        </div>
                        <div className="form-group">
                            <InputGroup hasValidation>
                                <Form.Control type="email" className="inputS form-control" isInvalid={emailerror} name="Email" placeholder="Email*" required="required" value={email} onChange={(e) => { setEmail(e.target.value); setEmailerror('') }} />
                                <Form.Control.Feedback type="invalid">
                                    {emailerror}
                                </Form.Control.Feedback>
                            </InputGroup>

                        </div>
                        <div className="form-group">
                            <InputGroup hasValidation>
                                <Form.Control type="text" className="inputS form-control" isInvalid={mferror} name="ref_cons" placeholder="Matricule Fiscal*" required="required" value={mf} onChange={(e) => { setMf(e.target.value); setMferror('') }} />
                                <Form.Control.Feedback type="invalid">
                                    {mferror}
                                </Form.Control.Feedback>
                            </InputGroup>

                        </div>
                        <div className="form-group">
                            <input type="text" className="inputS form-control" name="ref_intr" placeholder="Fax" required="required" value={fax} onChange={(e) => setFax(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="inputS form-control" name="prix" placeholder="Adress" required="required" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <InputGroup hasValidation>
                                <Form.Control type="text" className="inputS form-control" isInvalid={riberror} name="marqe" placeholder="Rib*" required="required" value={rib} onChange={(e) => { setRib(e.target.value); setRiberror('') }} />

                                <Form.Control.Feedback type="invalid">
                                    {riberror}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>

                    </Form>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onSubmit} variant="outline-success" type="submit">Ajouter</Button>
                <Button variant="outline-danger" onClick={() => close()}>Fermer</Button>


            </Modal.Footer>
        </Modal>
    );
}
export default ClientRegistre


