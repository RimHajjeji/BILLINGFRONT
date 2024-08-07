import React, { useState, useEffect } from 'react'
import '../../styles/home/Calender.css'
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { MdDeleteForever, MdOutlineModeEdit } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { baseUrl } from '../../config/base';
import { Home, Upd_etat_invoice } from '../../store/home/action';
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, Form, ModalBody, Table, Alert } from 'react-bootstrap'
import ModalAlert from '../modal/ModalAlert';
import InvoicePdfTemplate from '../invoice/InvoicePdfTemplate';
import { del_Invoice } from '../../store/invoice/action';
import { useLocation } from 'react-router-dom'
function Calender() {
    const dispatch = useDispatch();
    const location = useLocation();
    const montonht = useSelector(state => state?.Home?.data?.sum?.montantHT)
    /* const user = useSelector(state => state?.Home?.data?.data) */
    const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
    const invoice = useSelector(state => state?.Home?.data?.result)
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [deletes, setDeletes] = useState({})
    const [selectedInvoice, setSelectedInvoice] = useState({})
    const [invoices, setInvoices] = React.useState('')
    const [filtredClient, setFiltredInvoice] = React.useState([])
    const [showAddedFacture, setShowAddedFacture] = useState(false)
    const [showModalPdf, setModalPdf] = useState(false)
    /* state for  export pdf */
    const [productForExport, setProductForExport] = useState([])
    const [clientForExport, setClientForExport] = useState({})
    const [date, setDate] = useState(new Date().toISOString())
    const [invoiceNumber, setInvoiceNumber] = useState(null)
    const [TableValue, setTableValue] = useState([])
    const update = () => {
        dispatch(Upd_etat_invoice(selectedInvoice?._id, !selectedInvoice?.etats, Idcopany))
        handerClose()
    }
    const delate = () => {
        dispatch(del_Invoice(deletes?._id, Idcopany))
        handerClose1()
    }
    const keys = [
        "raison_sociale",
        "createdAt"

    ]

    const keys1 = [
        "montantHT"

    ]

    const exportPdf = (el) => {
        setProductForExport([...el?.materialId, ...el?.serviceId])
        setClientForExport(el?.clientId)
        setInvoiceNumber(el?.num)
        setTableValue({
            totalHt: el?.emontantHT,
            TotalTVA: el?.tTVA,
            TotalTTc: el?.montantTTC,
            Tmf: el?.tfc,
            net: el?.netapayer
        })
    }
    const closeExportPdf = () => {
        setModalPdf(false)
    }

    const handerClose = () => {
        setShow(false)
    }
    const handerClose1 = () => {
        setShow1(false)
    }
    useEffect(() => {
        if (location?.state?.added === true) {
            setShowAddedFacture(true)
            setTimeout(() => {
                setShowAddedFacture(false)
            }, 3000)
        }
    }, [location])
    useEffect(() => {
        if (invoices?.length > 0) {
            setFiltredInvoice(invoice?.filter((el) => {
                return (
                    keys.some((key) => el?.clientId?.[key]?.toLowerCase()?.includes(String(invoices)) === true)
                    /*  keys1.some((key1) => el?.montonht?.[key1]?.toLowerCase()?.includes(String(invoices)) === true) */
                )
            }))
        }
        else
            setFiltredInvoice(invoice)
    }, [invoices, invoice])
    /* const [month, setMonth] = useState(null); */
    /* const [Month, setMonth] = useState([
        { id: 1, month: 'Jan', num: '01' },
        { id: 2, month: 'Feb', num: '02' },
        { id: 3, month: 'Mar', num: '03' },
        { id: 4, month: 'Apr', num: '04' },
        { id: 5, month: 'May', num: '05' },
        { id: 6, month: 'Jun', num: '06' },
        { id: 7, month: 'Jul', num: '07' },
        { id: 8, month: 'Aug', num: '08' },
        { id: 9, month: 'Sep', num: '09' },
        { id: 10, month: 'Oct', num: '10' },
        { id: 11, month: 'Nov', num: '11' },
        { id: 12, month: 'Dec', num: '12' },
    ]) */
    /*  useEffect(() => {
         dispatch(Home(Idcopany))
     }, [Idcopany])
    */
    /*  console.log('mothsqsd', month) */
    /*   useEffect(() => {
          axios.get(`${baseUrl}/invoice/show/price/facture/${"62335aecf5eef1518583b505"}`)
              .then((res) => {
                  console.log('responce of api', res)
                  setListfacture(res.data.result)
                  setSum(res.data.sum)
              })
              .catch((e) => {
                  console.log(e)
              })
      }, []) *//* 
*/
    console.log('ddrytry', filtredClient, '|||', productForExport)
    return (

        <div style={{ marginTop: '60px' }}>
            <div className="d-grid gap-2">

                <Form.Group value={invoices} onChange={(e) => setInvoices(e.target.value)} style={{ marginTop: '40px', marginBottom: '40px' }} controlId="text">
                    <Form.Control className="input-search" type="text" placeholder=" search..." />
                </Form.Group>
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

                <tbody className="tbody-invoice">
                    {filtredClient?.length > 0 && filtredClient?.map((el) => {
                        return (

                            <tr key={el?._id}>
                                <td>{el?.nomrs}</td>
                                <td>N°{el?.num}</td>
                                <td>{el.emontantHT} CFA</td>
                                <td>{/* {el?.etats === true ? "payé" : "non payé"} */}
                                    {/*    <div class="col">
                                        <select class=" opt selectH form-select " aria-label="Default select example" value={etats} onChange={(e) => setEtats(e.target.value)}>
                                            <option className="opt" value="false">non payé</option>
                                            <option className="opt" value="true"> payé</option>
                                        </select>
                                    </div> */}
                                    <Form >
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label={el?.etats === true ? "payé" : "non payé"}
                                            value={el?.etats}
                                            onChange={() => {
                                                setSelectedInvoice(el)
                                                setShow(true)
                                            }}
                                            defaultChecked={el?.etats}
                                        />
                                    </Form>
                                </td>
                                <td>{el?.createdAt?.slice(0, 10)}</td>
                                <td>
                                    <div className='accbt'>
                                        {/* <Button onClick={() => {
                                            dispatch(Upd_etat_invoice(el?._id, etats, Idcopany))

                                        }

                                        } variant="outline-info" ><MdOutlineModeEdit /></Button> */}
                                        <Button onClick={async () => {
                                            await exportPdf(el)
                                            setModalPdf(true)
                                        }} variant='outline-info'><div className='delicon'><FiUpload /></div> </Button>
                                    </div>

                                </td>

                            </tr>
                        )
                    })}
                </tbody>
                {showAddedFacture && (
                    <Alert style={{ position: 'absolute', top: 0, rigtht: 0, margin: '20px' }} variant="success" >
                        <Alert.Heading>sucesse!</Alert.Heading>
                        <p>
                            facture ajouter avec sucesse
                        </p>
                    </Alert>
                )}
            </Table>
            <ModalAlert
                show={show}
                btnClicked={update}
                handleClose={handerClose}
                header={"Modifier l'etat du facture"}
                body={"Voulez vous modifier l'etat du facture?"}
                valider={"valider"}
                variants={"outline-primary"}
            />
            <ModalAlert
                show={show1}
                btnClicked={delate}
                handleClose={handerClose1}
                header={"supprimer factures"}
                body={"Voulez vous supprimer cette facture?"}
                valider={"supprimer"}
                variants={"outline-danger"}
            />
            <InvoicePdfTemplate
                show={showModalPdf}
                onHide={closeExportPdf}
                numfac={invoiceNumber}
                clientObject={clientForExport}
                dateErp={date}
                productObject={productForExport}
                totalTable={TableValue}
            />
        </div >

    )
}

export default Calender