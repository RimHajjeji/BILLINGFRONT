import React, { useState, useEffect, useRef } from 'react'
import { Button, Container, Col, Row, Alert, Image } from 'react-bootstrap'
import AddClientInvoice from './AddClientInvoice'
import InvoiceDetail from './InvoiceDetail'
import ProductInvoice from './ProductInvoice'
import Upload from '../../assets/Upload.svg'
import { useSelector, useDispatch } from 'react-redux'
import TableTotal2 from './TableTotal2'
/* import { } from 'react-pdf'; */
import { BsTelephone } from 'react-icons/bs'
import { GiRotaryPhone } from 'react-icons/gi'
import { FiMail } from 'react-icons/fi'
import axios from 'axios'
import ModalAddImage from './ModalAddImage'
import InvoicePdfTemplate from './InvoicePdfTemplate'
import { useHistory } from 'react-router-dom'
import { FiUpload } from 'react-icons/fi'
import { baseUrl } from '../../config/base'
import { AiOutlineFilePdf } from 'react-icons/ai'
import { Add_Invoice } from '../../store/invoice/action'
import { Show_material_byCompany } from '../../store/material/action'
import { Show_service_byCompany } from '../../store/service/action'

function Invoice(MaterielAmounts, ...props) {
    const file = useRef()
    const client = useSelector(state => state?.Show_client_byCompany?.data?.clientId?.respensable)
    const dispatch = useDispatch()
    const history = useHistory()
    const [date, setDate] = useState(new Date().toISOString())
    const [showAdd, setShowAdd] = useState(false)
    const [selectedClient, setSelectedClient] = useState({})
    const [selectedService, setSelectedService] = useState([])
    const [selectedMateriel, setSelectedMateriel] = useState([])
    const [ClientForExportPdf, setClientForExportPdf] = useState(null)
    const [productForExport, setPorductForExport] = useState([])
    const [showAlertClient, setShowAlertClient] = useState(false)
    const [showModalImage, setShowModalImage] = useState(false)
    const [showModalPdf, setModalPdf] = useState(false)
    const [showAlertExport, setsShowAlertExport] = useState(false)
    const [lastFacture, setLastFacture] = useState(null)
    const [preview, setPreview] = useState('')
    const [serviceAmount, setServiceAmount] = useState([])
    const [matreilAmount, setMaterielAmount] = useState([])
    const [showAlertProduct, setShowAlertProduct] = useState(false)

    const company = useSelector(state => state?.Show_company_byUser?.data[0])

    const [tableValues, setTableValues] = useState({
        totalHt: 0.000,
        TotalTVA: 0.000,
        TotalTTc: 0.000,
        Tmf: 0.600,
        net: 0.600,
    })
    const HideModalAddImage = () => {
        setShowModalImage(false)
    }
    const getPreview = () => {
        let reader = new FileReader()
        reader.readAsDataURL(file.current.files[0])
        reader.onloadend = () => {
            setPreview(reader.result)
        }
    }
    const addImage = () => {
        const formdata = new FormData()
        formdata.append('file', file.current.files[0])
        formdata.append('id', company?._id)
        axios.post(`${baseUrl}/company/img_add`, formdata)
            .then((res) => {
                console.log('responce is ', res)
            })
            .catch((err) => {
                console.error(err)
            })
    }
    useEffect(() => {
        if (!!preview)
            setShowModalImage(true)
    }, [preview])
    const AddInvocie = () => {
        const obj = {
            companyId: company?._id,
            clientId: selectedClient?._id,
            materialId: selectedMateriel,
            serviceId: selectedService,
            num: lastFacture,
            etats: false,
            emontantHT: tableValues?.totalHt,
            tTVA: tableValues?.TotalTVA,
            montantTTC: tableValues?.TotalTTc,
            netapayer: tableValues?.net,
            tfc: tableValues?.Tmf,
            nomrs: selectedClient?.respensable,
        }
        if (!obj?.clientId) {
            setShowAlertClient(true)
            setTimeout(() => {
                setShowAlertClient(false)
            }, 2000)
            return false
        }
        if (obj?.materialId?.length === 0 && obj?.serviceId?.length === 0) {
            setShowAlertProduct(true)
            setTimeout(() => {
                setShowAlertProduct(false)
            }, 2000)
            return false
        }
        if (obj?.clientId && (obj?.materialId?.length > 0 || obj?.serviceId?.length > 0)) {
            dispatch(Add_Invoice(obj, history))
            return true
        }
    }
    const exportPdf = () => {
        if (ClientForExportPdf?._id === undefined || productForExport.length === 0) {
            setsShowAlertExport(true)
            setTimeout(() => {
                setsShowAlertExport(false)
            }, 2000)
        }
        else
            setModalPdf(true)
    }
    const closeExportPdf = () => {
        setModalPdf(false)
    }
    useEffect(() => {
        if (company?._id !== undefined) {
            axios.get(`${baseUrl}/invoice/show/last/facture/company/${company?._id}`)
                .then((res) => {
                    if (res.data.result?.num === undefined)
                        setLastFacture("0000001")
                    else {
                        var lasNum = String(parseInt(res.data.result.num) + 1)
                        while (lasNum.length <= 6) {
                            lasNum = "0" + lasNum
                        }
                        setLastFacture(lasNum)
                    }
                })
                .catch((err) => {
                    console.error(err)
                })

        }
    }, [company])
    console.log('productForExport', selectedMateriel)
    return (
        <Container style={{ marginTop: '60px'/* , border: '1px solid red' */, overflowY: 'scroll !important' }}>
            {showAlertExport && (
                <Alert size="small" variant="danger" >
                    <Alert.Heading>Attention!</Alert.Heading>
                    <p>
                        Séléctionner un client est un produit au minimum pour faire l'export
                    </p>
                </Alert>
            )}
            {/* <Row style={{ cursor: 'pointer' }} onClick={exportPdf}>
                <Col md={{ span: 4, offset: 11 }}>
                    <AiOutlineFilePdf size={28} />
                </Col>
            </Row> */}
            <Row >
                <Col>
                    <Image
                        style={{ cursor: 'pointer' }}
                        src={`${baseUrl}/company/get_company/image/${company?.image?.filename}` ? `${baseUrl}/company/get_company/image/${company?.image?.filename}` : preview ? preview : Upload}
                        width={250}
                        /*   onClick={() => file.current.click()} */
                        thumbnail={true}
                    />
                </Col>
                <Col md={{ span: 4 }} style={{ marginBottom: '90px' }}><h1>Facture</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>{/* <strong style={{ fontSize: '30px', margin: '4px', lineHeight: '60px' }}></strong> */}<h3>N°: {lastFacture}</h3></div>
                </Col>

            </Row>
            <Row style={{ marginTop: '40px' }}>
                <Col lg='8'>
                    <AddClientInvoice
                        setClientObject={setSelectedClient}
                        setObjectForExport={setClientForExportPdf}
                    />
                </Col>
                <Col lg='3'>
                    <InvoiceDetail />
                </Col>
            </Row>
            <hr style={{ height: '3px' }}></hr>
            <Row>
                <ProductInvoice
                    settingTable={setTableValues}
                    setServiceArray={setSelectedService}
                    setMaterielArray={setSelectedMateriel}
                    setProductforPDF={setPorductForExport}
                    setMatetielAmount={setMaterielAmount}
                    setServiceAmount={setServiceAmount}
                />
            </Row>
            <hr style={{ height: '3px' }}></hr>
            <Row>
                <Col sm={{ span: 5, offset: "6" }} >
                    <TableTotal2
                        values={tableValues}
                    />
                </Col>
            </Row>
            <hr style={{ height: '3px' }}></hr>
            <Row>
                <Col>
                    <div><strong>Raison sociale:</strong> {company?.raison_sociale}</div>
                    <div><strong>Adresse:</strong> {company?.address}</div>
                    <div><strong>MF:</strong> {company?.mf}</div>
                </Col>
                <Col>
                    <div> <BsTelephone size={20} /> {company?.tle}</div>
                    <div><GiRotaryPhone size={20} /> {company?.fax}</div>
                    <div><FiMail size={20} /> {company?.email}</div>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 4, offset: 10 }}>
                    <Button variant='outline-success' onClick={() =>
                        AddInvocie()

                    }> Ajouter</Button>
                </Col>
            </Row>
            <Row>
                <Col sm={4} style={{ position: 'absolute', bottom: '0', marginTop: '30px' }}>
                    {showAlertClient && (
                        <Alert size="small" variant="danger" >
                            <Alert.Heading>Attention!</Alert.Heading>
                            <p>
                                Séléctionner un client SVP
                            </p>
                        </Alert>
                    )}
                    {showAlertProduct && (
                        <Alert size="small" variant="danger" >
                            <Alert.Heading>Attention!</Alert.Heading>
                            <p>
                                Séléctionner un produit ou un service SVP
                            </p>
                        </Alert>
                    )}
                </Col>
            </Row>
            <InvoicePdfTemplate
                show={showModalPdf}
                onHide={closeExportPdf}
                numfac={lastFacture}
                clientObject={ClientForExportPdf}
                dateErp={date}
                productObject={productForExport}
                totalTable={tableValues}
            />
        </Container>
    )
}
export default Invoice