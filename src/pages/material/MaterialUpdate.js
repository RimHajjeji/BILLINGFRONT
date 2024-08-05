import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { Upd_material } from '../../store/material/action';
import '../../styles/service/ServiceRegistre.css'
import { MdOutlineModeEdit } from "react-icons/md";


function MaterialUpdate({ element, ...props }) {
    const dispatch = useDispatch()

    const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
    const [nom, setNom] = useState()
    const [categorie, setCategorie] = useState()
    const [prix, setPrix] = useState()
    const [tva, setTva] = useState()
    const [ref_intr, setRef_intr] = useState()
    const [ref_cons, setRef_cons] = useState()
    const [amount, setAmount] = useState()
    const [marqe, setMarqe] = useState()

    const update_material = {
        companyId: Idcopany,
        nom: nom,
        amount: parseInt(amount),
        categorie: categorie,
        prix: prix,
        ref_cons: ref_cons,
        marqe: marqe,
        tva: parseFloat(tva),
        ref_intr: ref_intr,
    }
    console.log('selecetd ele', element)
    useEffect(() => {
        setNom(element?.nom)
        setAmount(element?.amount)
        setMarqe(element?.marqe)
        setCategorie(element?.categorie)
        setPrix(element?.prix)
        setRef_cons(element?.ref_cons)
        setTva(element?.tva)
        setRef_intr(element?.ref_intr)
    }, [element])

    //validation state
    const [validated, setValidated] = useState(false);
    const [nomerror, setNomerror] = useState("");
    const [amounterror, setAmounterror] = useState("");
    const [categorieerror, setCategorieerror] = useState("");
    const [prixerror, setPrixerror] = useState("");
    const [refinterror, setRefinterror] = useState("");

    const valid = () => {
        let count = 0;


        if (!nom) {
            count++;
            setNomerror("Inserer un nom pour cette material SVP ");
        }

        if (!ref_intr) {
            count++;
            setRefinterror("Inserer une Reference Internet pour cette material SVP ")
        }


        if (!amount) {
            count++;
            setAmounterror("Inserer une contiter pour cette material SVP ");
        }

        if (!categorie) {
            count++;
            setCategorieerror("Remplir le categorie du material SVP ");
        }

        if (prix <= 0) {
            count++;
            setPrixerror("Le prix du material doit étre remplir ");
        }

        if (count > 0) {
            setValidated(false);
            return false;
        }
        return true;
    };

    const close = () => {
        props.onHide()
        setNomerror('')
        setAmounterror('')
        setCategorieerror('')
        setPrixerror('')

    }
    const onSubmit = async () => {
        const isValid = valid();
        if (isValid) {
            dispatch(Upd_material(element?._id, update_material, Idcopany))
            close()
        }
    };

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

                <div class="signup-formS">
                    <Form validated={validated}>
                        <h2>MODIFIER MATERIAL</h2>
                        <div class="form-group">
                            <div class="row">
                                <div class="col">
                                    <label htmlFor="">Nom <MdOutlineModeEdit /></label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" className="inputS form-control" name="nom" placeholder="Nom *" required="required"
                                            isInvalid={nomerror} value={nom} onChange={(e) => { setNom(e.target.value); setNomerror(""); }} />
                                        <Form.Control.Feedback type="invalid">
                                            {nomerror}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </div>
                                <div class="col">
                                    <label htmlFor="">Tva <MdOutlineModeEdit /></label>
                                    <select class=" op selectS form-select form-select-lg mb-3" aria-label="Default select example" value={tva} onChange={(e) => setTva(e.target.value)}>
                                        <option className="op" value="0">Tva</option>
                                        <option className="op" value="0.07">7%</option>
                                        <option className="op" value="0.13">13%</option>
                                        <option className="op" value="0.19">19%</option>
                                    </select>
                                </div>
                                <div class="col">
                                    <label htmlFor="">Categorie <MdOutlineModeEdit /></label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="text" className="inputS form-control" name="categorie" placeholder="Categorie *" required="required" isInvalid={categorieerror} value={categorie} onChange={(e) => { setCategorie(e.target.value); setCategorieerror("") }} />
                                        <Form.Control.Feedback type="invalid">
                                            {categorieerror}
                                        </Form.Control.Feedback>
                                    </InputGroup>

                                </div>
                                <div class="col">
                                    <label htmlFor="">Quantité <MdOutlineModeEdit /></label>
                                    <InputGroup hasValidation>
                                        <Form.Control type="number" className="inputS form-control" name="ref_cons" placeholder="Quantité *" required="required" isInvalid={amounterror} value={amount} onChange={(e) => { setAmount(e.target.value); setCategorieerror("") }} />
                                        <Form.Control.Feedback type="invalid">
                                            {amounterror}
                                        </Form.Control.Feedback>
                                    </InputGroup>

                                </div>
                            </div>



                        </div>
                        <div class="form-group">
                            <label htmlFor="">Reference Constructeur <MdOutlineModeEdit /></label>
                            <input type="text" className="inputS form-control" name="ref_cons" placeholder="Reference Constructeur" required="required" value={ref_cons} onChange={(e) => setRef_cons(e.target.value)} />

                        </div>
                        <div class="form-group">
                            <label htmlFor="">Reference Internet <MdOutlineModeEdit /></label>

                            <InputGroup hasValidation>
                                <Form.Control type="text" className="inputS form-control" name="ref_intr" placeholder="Reference Internet" required="required" isInvalid={refinterror} value={ref_intr} onChange={(e) => { setRef_intr(e.target.value); setRefinterror("") }} />
                                <Form.Control.Feedback type="invalid">
                                    {refinterror}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </div>
                        <div class="form-group">
                            <label htmlFor="">Prix <MdOutlineModeEdit /></label>
                            <InputGroup hasValidation>
                                <Form.Control type="number" className="inputS form-control" name="prix" placeholder="Prix *" required="required" isInvalid={prixerror} value={prix} onChange={(e) => { setPrix(e.target.value); setPrixerror("") }} />
                                <Form.Control.Feedback type="invalid">
                                    {prixerror}
                                </Form.Control.Feedback>
                            </InputGroup>

                        </div>

                        <div class="form-group">
                            <label htmlFor="">Marqe <MdOutlineModeEdit /></label>
                            <input type="text" className="inputS form-control" name="marqe" placeholder="Marqe" required="required" value={marqe} onChange={(e) => setMarqe(e.target.value)} />
                        </div>

                    </Form>
                </div>
            </Modal.Body >
            <Modal.Footer>
                <Button onClick={onSubmit} variant="outline-success" type="submit">Modifier</Button>
                <Button variant="outline-danger" onClick={() => close()}>Fermer</Button>


            </Modal.Footer>
        </Modal>
    );
}
export default MaterialUpdate