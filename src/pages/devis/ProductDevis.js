import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Table, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';

import { Show_material_byCompany } from '../../store/material/action';
import { Show_service_byCompany } from '../../store/service/action';
import { FiEdit } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineSplitscreen } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import ModalAddAmout from './ModalAddAmout';
import CustomDropdown from './CustomDropdown';
import ModalModifyPrice from './ModalModifyPrice';

import { RiCustomerService2Fill } from 'react-icons/ri';
import MaterialRegistre from '../material/MaterialRegistre';
import RegisterService from '../service/ServiceRegistre';

function ProductDevis({ settingTable, setServiceArray, setProductforPDF, setMaterielArray, setMatetielAmount, setServiceAmount, ...props }) {
    const dispatch = useDispatch();
    const companyId = useSelector(state => state?.Show_company_byUser?.data[0]?._id);
    const materiels = useSelector(state => state?.Show_material_byCompany?.data);
    const services = useSelector(state => state?.Show_service_byCompany?.data);
    const [addingProduct, setAddingProduct] = useState(0);
    const [addingService, setAddingService] = useState(0);
    const [devisItems, setDevisItems] = useState([]);
    const [selectedMateriel, setSelectedMaterie] = useState({});
    const [selectedMaterielForPrice, setSelectedMaterielForPrice] = useState({});
    const [count, setCount] = useState(0);
    const [PreSelected, setPreSelected] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [typeMateriel, setMaterielType] = useState('');
    const [showModalPrice, setShowModalPrice] = useState(false);
    const [showaddservice, setShowaddservice] = useState(false);
    const [showaddmaterial, setShowaddmaterial] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [type, setType] = useState('');

    useEffect(() => {
        dispatch(Show_material_byCompany(companyId));
        dispatch(Show_service_byCompany(companyId));
    }, [companyId, count]);

    useEffect(() => {
        setAddingProduct(0);
        setAddingService(0);
    }, [devisItems, count]);

    useEffect(() => {
        if (devisItems.length > 0) {
            let totalHt = 0;
            let totalTva = 0;
            let totalTtc = 0;
            devisItems.forEach(item => {
                const itemTotalHt = item.amount ? (parseInt(item.prix) * parseInt(item.amount)) : parseInt(item.prix);
                totalHt += itemTotalHt;
                totalTva += parseFloat(item.mt_tva);
                totalTtc += itemTotalHt + parseFloat(item.mt_tva);
            });
            settingTable({
                totalHt,
                TotalTVA: totalTva,
                TotalTTc: totalTtc,
                Tmf: 0.600,
                net: totalTtc + 0.600,
            });
        } else {
            settingTable({
                totalHt: 0.000,
                TotalTVA: 0.000,
                TotalTTc: 0.000,
                Tmf: 0.600,
                net: 0.600,
            });
        }
    }, [devisItems]);

    useEffect(() => {
        if (selectedMateriel._id) {
            setShowModal(true);
            setPreSelected(false);
        }
    }, [selectedMateriel]);

    const CloseModalAmount = (id) => {
        if (!PreSelected) {
            setDevisItems(devisItems.filter(el => el._id !== id));
        }
        setShowModal(false);
    };

    const CloseModalPrice = () => {
        setShowModalPrice(false);
    };

    const handleChange = (id, val) => {
        const updatedItem = devisItems.find(el => el._id === id);
        updatedItem.amount = val;
        setDevisItems(prev => [...prev.filter(el => el._id !== id), updatedItem]);
        setShowModal(false);
        setCount(prev => prev + 1);
        setSelectedMaterie({});
        handleChangePrice(id, updatedItem.prix);
    };

    const addProductOrService = () => {
        if (addingProduct > 0 && addingService === 0) {
            setShowaddmaterial(true);
        } else {
            setShowaddservice(true);
        }
    };

    useEffect(() => {
        if (devisItems.length > 0)
            setProductforPDF(devisItems);
    }, [devisItems]);

    const handleChangePrice = (id, val) => {
        const updatedItem = devisItems.find(el => el._id === id);
        updatedItem.prix = val;
        updatedItem.mt_tva = (parseInt(val) * parseInt(updatedItem.amount)) * parseFloat(updatedItem.tva);
        updatedItem.ttc = (parseInt(val) * parseInt(updatedItem.amount)) + parseFloat(updatedItem.mt_tva);
        setDevisItems(prev => [...prev.filter(el => el._id !== id), updatedItem]);
        setShowModalPrice(false);
        setSelectedMaterie({});
    };

    return (
        <Container>
            <Row>
                <Col sm={{ span: 1, offset: '10' }}>
                    <Button onClick={() => {
                        setAddingProduct(prev => prev + 1);
                        setAddingService(0);
                    }} variant='outline-primary'><MdOutlineProductionQuantityLimits />+</Button>
                </Col>
                <Col sm={{ span: 1 }}>
                    <Button onClick={() => {
                        setAddingService(prev => prev + 1);
                        setAddingProduct(0);
                    }} variant='outline-primary'><RiCustomerService2Fill />+</Button>
                </Col>
            </Row>
            <Row>
                <Table striped borderless hover responsive size="lg" className="calender-table">
                    <thead className="thead-devis">
                        <tr>
                            <th></th>
                            <th>Désignation</th>
                            <th>Quantité</th>
                            <th>PU HT</th>
                            <th>Montant</th>
                            <th>TVA</th>
                            <th>MT TVA</th>
                            <th>MT TTC</th>
                            <th></th>
                        </tr>
                        <tr>
                            {addingProduct > 0 ? (
                                <CustomDropdown
                                    data={materiels}
                                    name={"Matériel"}
                                    setFacture={setDevisItems}
                                    Facture={devisItems}
                                    addP={addProductOrService}
                                    count={setCount}
                                    selectedMateriel={setSelectedMaterie}
                                    MaterielSelected={setMaterielArray}
                                    setMaterielType={setMaterielType}
                                />
                            ) : addingService > 0 ? (
                                <CustomDropdown
                                    data={services}
                                    setFacture={setDevisItems}
                                    name={"Service"}
                                    addP={addProductOrService}
                                    Facture={devisItems}
                                    count={setCount}
                                    ServiceSelected={setServiceArray}
                                    selectedMateriel={setSelectedMaterie}
                                    MaterielSelected={setMaterielArray}
                                    setMaterielType={setMaterielType}
                                />
                            ) : null}
                        </tr>
                    </thead>
                    <tbody className="tbody-devis">
    {devisItems.length > 0 && devisItems.map(el => (
        <tr key={el._id}>
            <td></td>
            <td>{el.nom}</td>
            <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <FormControl
                    type="number"
                    disabled
                    style={{ height: '30px', width: '100px', alignSelf: 'center' }}
                    value={el.amount ? el.amount : "-"}
                />
                <BiEdit size={'20'} style={{ cursor: 'pointer' }} onClick={() => {
                    setShowModal(true);
                    const selectedItem = services.find(el2 => el2._id === el._id) || materiels.find(el2 => el2._id === el._id);
                    setSelectedMaterie(selectedItem);
                    setPreSelected(true);
                }} />
            </td>
            <td>{el.prix} <BiEdit size={'20'} style={{ cursor: 'pointer' }} onClick={() => {
                setSelectedMaterielForPrice(el);
                setShowModalPrice(true);
            }} /></td>
            <td>{el.amount * el.prix}</td>
            <td>{Math.round(parseFloat(el.tva) * 100)}%</td>
            <td>{parseFloat(el.mt_tva).toFixed(3)}</td>
            <td>
                {
                    typeof el.ttc === 'number' 
                        ? el.ttc.toFixed(3) 
                        : parseFloat(el.ttc || 0).toFixed(3)
                }
            </td>
            <td><MdDeleteOutline size={'20'} style={{ cursor: 'pointer' }} onClick={() => {
                setDevisItems(devisItems.filter(el2 => el2._id !== el._id));
                setCount(prev => prev + 1);
            }} /></td>
        </tr>
    ))}
</tbody>

                </Table>
            </Row>
            <Row>
                <ModalAddAmout
                    show={showModal}
                    close={() => CloseModalAmount(selectedMateriel._id)}
                    selectedMateriel={selectedMateriel}
                    changeAmount={handleChange}
                    type={typeMateriel}
                />
                <ModalModifyPrice
                    show={showModalPrice}
                    close={CloseModalPrice}
                    selectedMateriel={selectedMaterielForPrice}
                    changeAmount={handleChangePrice}
                />
                <MaterialRegistre show={showaddmaterial} setShow={setShowaddmaterial} />
                <RegisterService show={showaddservice} setShow={setShowaddservice} />
            </Row>
        </Container>
    );
}

export default ProductDevis;
