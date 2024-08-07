import React, { useState, useEffect } from 'react'
import { Container, Col, Row, Button, Table, FormControl } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Show_material_byCompany } from '../../store/material/action'
import { Show_service_byCompany } from '../../store/service/action'
import { FiEdit } from 'react-icons/fi'
import { BiEdit } from 'react-icons/bi'
import { MdOutlineSplitscreen, MdDeleteOutline, MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { RiCustomerService2Fill } from 'react-icons/ri'
import ModalAddAmount from './ModalAddAmount'
import CustomDropdown from './CustomDropdown'
import ModalModifyPrice from './ModalModifyPrice'
import MaterialRegister from '../material/MaterialRegister'
import RegisterService from '../service/ServiceRegister'

function ProductDevis({ settingTable, setServiceArray, setProductForPDF, setMaterialArray, setMaterialAmount, setServiceAmount, ...props }) {
    const dispatch = useDispatch()
    const companyId = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
    const materials = useSelector(state => state?.Show_material_byCompany?.data)
    const services = useSelector(state => state?.Show_service_byCompany?.data)
    const [addingProduct, setAddingProduct] = useState(0)
    const [addingService, setAddingService] = useState(0)
    const [quotationItems, setQuotationItems] = useState([])
    const [selectedMaterial, setSelectedMaterial] = useState({})
    const [selectedMaterialForPrice, setSelectedMaterialForPrice] = useState({})
    const [count, setCount] = useState(0)
    const [preSelected, setPreSelected] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [materialType, setMaterialType] = useState('')
    const [showModalPrice, setShowModalPrice] = useState(false)
    const [showAddService, setShowAddService] = useState(false)
    const [showAddMaterial, setShowAddMaterial] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [type, setType] = useState('')

    useEffect(() => {
        dispatch(Show_material_byCompany(companyId))
        dispatch(Show_service_byCompany(companyId))
    }, [companyId, count])

    useEffect(() => {
        setAddingProduct(0)
        setAddingService(0)
    }, [quotationItems, count])

    useEffect(() => {
        if (quotationItems?.length > 0) {
            let ttht = 0
            let ttva = 0
            let tttc = 0
            quotationItems?.map((el) => {
                ttht = el?.amount !== undefined ? ((parseInt(el?.price) * parseInt(el?.amount))) + ttht : (parseInt(el?.price)) + ttht
                ttva = parseFloat(el?.mt_tva) + ttva
                tttc = parseFloat(ttht) + ttva
            })
            settingTable({
                totalHt: ttht,
                TotalTVA: ttva,
                TotalTTc: tttc,
                Tmf: 0.600,
                net: tttc + 0.600,
            })
        } else {
            settingTable({
                totalHt: 0.000,
                TotalTVA: 0.000,
                TotalTTc: 0.000,
                Tmf: 0.600,
                net: 0.600,
            })
        }
    }, [quotationItems])

    useEffect(() => {
        if (selectedMaterial?._id !== undefined) {
            setShowModal(true)
            setPreSelected(false)
        }
    }, [selectedMaterial])

    const closeModalAmount = (id) => {
        if (!preSelected) { 
            setQuotationItems(quotationItems.filter(el => el?._id !== id))
        }
        setShowModal(false)
    }

    const closeModalPrice = () => {
        setShowModalPrice(false)
    }

    const handleChange = (id, val) => {
        var arr = quotationItems.filter((el) => el?._id === id)[0]
        arr['amount'] = val
        setQuotationItems(prev => [...prev.filter(el => el?._id !== id), arr])
        setShowModal(false)
        setCount(prev => prev + 1)
        setSelectedMaterial({})
        handleChangePrice(id, arr['price'])
    }

    const addProduct = () => {
        if (addingProduct > 0 && addingService === 0) {
            setShowAddMaterial(true)
        } else {
            setShowAddService(true)
        }
    }

    useEffect(() => {
        if (quotationItems.length > 0)
            setProductForPDF(quotationItems)
    }, [quotationItems])

    const handleChangePrice = (id, val) => {
        var arr = quotationItems.filter((el) => el?._id === id)[0]
        arr['price'] = val
        arr['mt_tva'] = ((parseInt(val) * parseInt(arr['amount'])) * parseFloat(arr['tva']))
        arr['ttc'] = (parseInt(val) * parseInt(arr['amount'])) + parseFloat(arr['mt_tva'])
        setQuotationItems(prev => [...prev.filter(el => el?._id !== id), arr])
        setShowModalPrice(false)
        setSelectedMaterial({})
    }

    return (
        <Container>
            <Row>
                <Col sm={{ span: 1, offset: '10' }}>
                    <Button onClick={() => {
                        setAddingProduct(prev => prev + 1)
                        setAddingService(0)
                    }} variant='outline-primary'><MdOutlineProductionQuantityLimits />+</Button>
                </Col>
                <Col sm={{ span: 1 }}>
                    <Button onClick={() => {
                        setAddingService(prev => prev + 1)
                        setAddingProduct(0)
                    }} variant='outline-primary'><RiCustomerService2Fill />+</Button>
                </Col>
            </Row>
            <Row>
                <Table striped borderless="true" hover responsive size="lg" className="calender-table">
                    <thead className="thead-invoice">
                        <tr>
                            <th></th>
                            <th>Désignation</th>
                            <th>Quantité</th>
                            <th>PU HT</th>
                            <th>Mt</th>
                            <th>TVA</th>
                            <th>MT TVA</th>
                            <th>MT TTC</th>
                            <th></th>
                        </tr>
                        <tr>
                            {addingProduct > 0 ? (
                                <CustomDropdown
                                    data={materials}
                                    name={"Matériel"}
                                    setFacture={setQuotationItems}
                                    Facture={quotationItems}
                                    addP={addProduct}
                                    count={setCount}
                                    selectedMaterial={setSelectedMaterial}
                                    MaterialSelected={setMaterialArray}
                                    setMaterialType={setMaterialType}
                                />
                            ) : addingService > 0 ? (
                                <CustomDropdown
                                    data={services}
                                    setFacture={setQuotationItems}
                                    name={"Service"}
                                    addP={addProduct}
                                    Facture={quotationItems}
                                    count={setCount}
                                    ServiceSelected={setServiceArray}
                                    selectedMaterial={setSelectedMaterial}
                                    MaterialSelected={setMaterialArray}
                                    setMaterialType={setMaterialType}
                                />
                            ) : null}
                        </tr>
                    </thead>
                    <tbody className="tbody-invoice">
                        {quotationItems?.length > 0 && quotationItems.map(el => (
                            <tr key={el?._id}>
                                <td></td>
                                <td>{el?.nom}</td>
                                <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <FormControl
                                        type="number"
                                        disabled
                                        style={{ height: '30px', width: '100px', alignSelf: 'center' }}
                                        value={el?.amount ? el?.amount : "-"}
                                    />
                                    <BiEdit size={'20'} style={{ cursor: 'pointer' }} onClick={() => {
                                        setShowModal(true)
                                        if (services?.map(el2 => el2?._id).includes(el?._id)) {
                                            setSelectedMaterial(services?.filter(el2 => el2?._id === el?._id)[0], () => {
                                                setPreSelected(true)
                                            })
                                        } else {
                                            setSelectedMaterial(materials?.filter(el2 => el2?._id === el?._id)[0], () => {
                                                setPreSelected(true)
                                            })
                                        }
                                    }} />
                                </td>
                                <td>{el?.price} <BiEdit size={'20'} style={{ cursor: 'pointer' }} onClick={() => {
                                    setSelectedMaterialForPrice(el)
                                    setShowModalPrice(true)
                                }} /></td>
                                <td>{el?.amount * el?.price}</td>
                                <td>{Math.round(parseFloat(el?.tva) * 100)}%</td>
                                <td>{parseFloat(el?.mt_tva).toFixed(3)}</td>
                                <td>{el?.ttc}</td>
                                <td style={{ cursor: 'pointer' }} onClick={() => {
                                    setQuotationItems(quotationItems?.filter((el2) => el2?._id !== el?._id))
                                }}><MdDeleteOutline size={25} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
            <ModalAddAmount
                show={showModal}
                selectedMaterial={selectedMaterial}
                changeAmount={handleChange}
                onHide={closeModalAmount}
                PreSelected={preSelected}
                type={materialType}
                setServiceAmount={setServiceAmount}
                setMaterialAmount={setMaterialAmount}
            />
            <ModalModifyPrice
                show={showModalPrice}
                selectedMaterial={selectedMaterialForPrice}
                changePrice={handleChangePrice}
                onHide={closeModalPrice}
            />
            <MaterialRegister
                show={showAddMaterial}
                onHide={() => setShowAddMaterial(false)}
            />
            <RegisterService
                show={showAddService}
                onHide={() => setShowAddService(false)}
            />
        </Container>
    )
}

export default ProductDevis
