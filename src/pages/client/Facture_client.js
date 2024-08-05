import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Form, Row, Col } from 'react-bootstrap'
import { FiUpload } from "react-icons/fi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import '../../styles/client/Client.css'
import { Del_client, Show_client_byCompany, Show_invoice_byClient } from '../../store/client/action';
import { useParams } from 'react-router-dom'
import ModalAlert from '../modal/ModalAlert';
import { del_Invoice_byclient } from '../../store/invoice/action';
import InvoicePdfTemplate from '../invoice/InvoicePdfTemplate';
import { Upd_etat_invoice } from '../../store/home/action';


function Facture_client() {

    const dispatch = useDispatch();
    const { nom } = useParams();
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [deletes, setDeletes] = useState({})
    const [date, setDate] = useState()
    const [selectedInvoice, setSelectedInvoice] = useState({})

    const clientId = useSelector(state => state?.Show_client_byCompany?.data?._id)
    const [clientObject, setClientObject] = useState({})
    const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
    const InvoiceClient = useSelector(state => state?.Show_invoice_byClient?.data?.result)
    const sum = useSelector(state => state?.Show_invoice_byClient?.data?.sum)
    const [showModalPdf, setShowModalPdf] = useState(false)
    const [invoiceNumber, setInvoiceNumber] = useState(false)
    const [productForExport, setProductForExport] = useState([])
    const [TableValue, setTableValue] = useState([])
    //const NomClient = useSelector(state => state?.Show_invoice_byClient?.data?.result[0])
    const update = () => {
        dispatch(Upd_etat_invoice(selectedInvoice?._id, !selectedInvoice?.etats, selectedInvoice?.clientId?._id))
        handerClose2()
    }
    const handerClose2 = () => {
        setShow1(false)
    }

    const delate = () => {
        dispatch(del_Invoice_byclient(deletes?._id, InvoiceClient?._id))
        handerClose()
    }
    const handerClose = () => {
        setShow(false)
    }
    const closeExport = () => {
        setShowModalPdf(false)
    }

    /* console.log('client map', NomClient?.clientId?.raison_sociale) */
    return (



        <div className='container' style={{ marginTop: '60px' }}>
            <Row style={{ textAlign: 'center', fontSize: '40px', margin: '40px', color: '#021740' }}>
                <Col md={1}></Col>
                <Col md={10}><h1>FACTURES DE {nom}</h1></Col>
                <Col md={1}></Col>

            </Row>
            <div className="serachh">
                <Form.Group style={{ marginTop: '40px' }} controlId="text">
                    <Form.Control className="input-search" type="text" placeholder="search..." />
                </Form.Group>
            </div>
            {/*  <div className="add">

        <Button onClick={() => setModalShow(true)} className='btnn' variant="outline-primary">Ajouter Client</Button>
        <ClientRegistre
          show={modalShow}
          onHide={() => setModalShow(false)}
        />



      </div> */}

            <div className="d-grid gap-2">
                {/*   <div class="left">
                    <AiOutlineCaretLeft />
                </div> */}
                {/*  <ButtonGroup className="mb-2" size="lg" aria-label="First group">
                    {Month.map((el) => {
                        return (
                            <Button className='test' size='lg' variant="secondary" key={el.id}>{el.month}</Button>
                        )
                    }
                    )}
                </ButtonGroup> */}
            </div>
            <Table striped borderless="true" hover responsive size="lg" className="calender-table"  >
                <thead className="thead-invoice">
                    <tr >
                        <th  >CLIENT</th>
                        <th >NUM FACTURE</th>
                        <th >MONTANT HT</th>
                        <th >ÉTAT</th>
                        <th >DATE</th>
                        <th >ACTION</th>
                    </tr>
                </thead>
                <tbody className="tbody-service">
                    {InvoiceClient?.length > 0 && InvoiceClient?.map((el) => {
                        return (
                            <tr key={el?._id}>
                                <td>{el?.clientId?.raison_sociale}</td>
                                <td>N°{el?.num}</td>
                                <td>{el.emontantHT} DT</td>
                                <td><Form >
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label={el?.etats === true ? "payé" : "non payé"}
                                        value={el?.etats}
                                        onChange={() => {
                                            setSelectedInvoice(el)
                                            setShow1(true)
                                        }}
                                        checked={el?.etats}
                                    />
                                </Form></td>
                                <td>{el?.createdAt?.slice(0, 10)}</td>
                                <td>
                                    <div className='accbt'>
                                        <Button onClick={() => {
                                            /*    setShow(true)
                                               setDeletes(el) */
                                            setShowModalPdf(true)
                                            setTableValue({
                                                totalHt: el?.emontantHT,
                                                TotalTVA: el?.tTVA,
                                                TotalTTc: el?.montantTTC,
                                                Tmf: el?.tfc,
                                                net: el?.netapayer
                                            })
                                            setProductForExport([...el?.materialId, ...el?.serviceId])
                                            setInvoiceNumber(el?.num)
                                            setClientObject(el?.clientId)
                                            setDate(el?.createdAt?.slice(0, 10))
                                        }} variant='outline-info'><div className='delicon'><FiUpload /></div> </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ModalAlert
                show={show1}
                btnClicked={update}
                handleClose={handerClose2}
                header={"Modifier l'etat du facture"}
                body={"Voulez vous modifier l'etat du facture?"}
                valider={"valider"}
                variants={"outline-primary"}
            />
            <ModalAlert
                show={show}
                btnClicked={delate}
                handleClose={handerClose}
                header={"supprimer factures"}
                body={"Voulez vous supprimer cette facture?"}
                valider={"supprimer"}
                variants={"outline-danger"}
            />
            <InvoicePdfTemplate
                show={showModalPdf}
                onHide={closeExport}
                numfac={invoiceNumber}
                clientObject={clientObject}
                dateErp={date}
                productObject={productForExport}
                totalTable={TableValue}
            />
        </div>
    )
}

export default Facture_client