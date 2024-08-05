
import React, { useState, useEffect } from 'react'
import '../../styles/admin/Homeadmin.css'
import DatePicker from 'sassy-datepicker';
import { BsCalendar2Date } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup, Form, FormControl, ModalBody, Table } from 'react-bootstrap'
import { Show_All_company } from '../../store/company/action';
import Homecalander from './Homecalander';
import EditDate from './EditDate';
import moment from 'moment'
import { Update_etat_user, Upd_abon_user } from '../../store/user/actionUser/action'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ModalAlert from '../modal/ModalAlert';
import { Update_etat } from '../../store/client/action';
import Abon from './Abon';

function Homeadmin() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state?.LoginUser?.data?.new?._id)
    const company = useSelector(state => state?.Show_All_company?.data)
    const Idcopany = useSelector(state => state?.Show_company_byUser?.data[0]?._id)
    const [show, setShow] = useState(false)
    const [showAbn, setShowAbn] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})
    const [invoices, setInvoices] = React.useState('')
    const [updShow, setUpdShow] = React.useState(false);
    const [changedt, setChangedt] = useState(null);
    const [elem, setElem] = useState(null);
    const [elemabn, setElemAbn] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [showPopup, setshowPopup] = useState(false)

    const update = () => {
        dispatch(Update_etat_user(selectedUser?.userId?._id, !selectedUser?.userId?.etats))
        handerClose()
    }
    const handerClose = () => {
        setShow(false)
    }

    const handerCloseAbn = () => {
        setShowAbn(false)
    }

    const onChangeDate = (date) => {
        /* let obj = [elem]?.forEach((el) => (el.userId['abon'] = date?.toString()?.slice(4, 15))) */
        console.log('date====', date.toString());
        /*   setElem({     
           }) */
    };
    const changeDateAbbon = () => {
        dispatch(Upd_abon_user(idUser, {
            abon
                : changedt
        }))
        setshowPopup(false)
    }
    const keys = [
        "raison_sociale"
    ]
    /* const keys1 = [
        "emontantHT"
    ] */

    /*     useEffect(() => {
            if (invoices?.length > 0) {
                setFiltredInvoice(invoice?.filter((el) => {
                    return (
                        keys.some((key) => el?.clientId?.[key]?.toLowerCase()?.includes(String(invoices)) === true)
                        keys1.some((key1) => el?.[key1]?.toLowerCase()?.includes(String(invoices)) === true)
                    )
                }))
            }
            else
                setFiltredInvoice(invoice)
        }, [invoices, invoice]) */

    useEffect(() => {
        dispatch(Show_All_company())
    }, [], [company])

    useEffect(() => {
        if (changedt !== null)
            setshowPopup(true)
    }, [changedt])
    console.log('set invopu', idUser, company);
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
                        <th >RAISON SOCIAL</th>
                        <th >RESPONSABLE</th>
                        <th >EMAIL</th>
                        <th >TELEPHONE</th>
                        <th >ABONNEMENT</th>
                        <th >ÉTATS</th>
                    </tr>
                </thead>
                <tbody className="tbody-invoice">
                    {company?.length > 0 && company?.map((el) => {
                        console.log('ddd', changedt)
                        return (
                            <tr key={el?._id}>
                                <td>{el?.raison_sociale}</td>
                                <td>{el?.userId.prenom} {el?.userId.nom}</td>
                                <td>{el?.email} </td>
                                <td>+216 {el?.tle}</td>
                                <td>

                                    <Button onClick={() => {
                                        setElemAbn(el)
                                        setShowAbn(true)

                                    }} variant='outline-info'><div className='delicon'><BsCalendar2Date
                                    /></div> </Button>

                                    {/* <FormControl
                                        type="date"
                                        style={{ height: '30px', width: '18vh', alignSelf: 'center' }}
                                        onClick={() => setIdUser(el?.userId?._id)}
                                        value={idUser === el?.userId?._id ? changedt : el?.userId?.abon ? el?.userId?.abon : null}
                                        onChange={(e) => { setChangedt(e.target.value) }} />
                                    <span style={{ cursor: 'pointer', color: '#0d6efd' }} onClick={() => {
                                        setUpdShow(true)
                                        setElem(el)
                                    }
                                    }  ></span> */}
                                </td>

                                <td>
                                    <Form>
                                        <Form.Check
                                            type="switch"
                                            id="custom-switch"
                                            label={el?.userId?.etats === true ? 'Activer' : 'Bloquer'}
                                            value={el?.userId?.etats}
                                            onChange={() => {
                                                setSelectedUser(el)
                                                setShow(true)
                                            }}
                                            checked={el?.userId?.etats}
                                        />
                                    </Form>
                                    {/* {el?.userId?.etats === 'true' ? 'Activer' : 'Bloquer'} */}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ModalAlert
                show={show}
                btnClicked={update}
                handleClose={handerClose}
                header={"Modifier l'etat d'utilisateur"}
                body={"Voulez vous modifier l'etat d'utilisateur?"}
                valider={"valider"}
                variants={"outline-primary"}
            />
            <Homecalander
                show={updShow}
                element={elem}
                onHide={() => setUpdShow(false)}
                changeDate={onChangeDate}
            />
            <EditDate
                show={showPopup}
                handleClose={() => {
                    setshowPopup(false)
                }}
                onSubmit={changeDateAbbon}

            />
            <Abon
                show={showAbn}
                onHide={() => setShowAbn(false)}
                element={elemabn}

            />
        </div>
    )
}

export default Homeadmin